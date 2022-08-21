const sendEmail = require("../utils/email");
const Token = require("../models/Token");
const { User, validate } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

// SignUp
exports.signup = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exist!");

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return res.status(401);
      user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }).save();

      let token = await new Token({
        userId: user._id,
        access_token: generateAccessToken({ userId: user._id }),
        refresh_token: generateRefreshToken({ userId: user._id }),
      }).save();

      const message = `${process.env.BASE_URL}/auth/verify/${user.id}/${token.access_token}`;
      await sendEmail(user.email, "Verify Email", message);

      res.status(200).send("An Email sent to your account please verify");
    });
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

// Login
exports.signin = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const loggedUser = await User.findOne({ email: req.body.email });
    if (!loggedUser) return res.status(400).send("User doesnot exist!");

    if (!(await bcrypt.compare(req.body.password, loggedUser.password))) {
      return res.status(403).send("password incorrect");
    }

    const user = { userId: loggedUser.id };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await Token.findOneAndUpdate(
      { userId: user.userId },
      { access_token: accessToken, refresh_token: refreshToken },
      { new: true }
    );

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

// Refresh Access Token
exports.refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(400).send("Empty Token");
  if (!(await Token.findOne({ refresh_token: refreshToken })))
    return res.status(401).send("Token doesnot found");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(403);
    const accessToken = generateAccessToken({ userId: user.userId });
    return res.json({ accessToken });
  });
};

// Email Verification
exports.verify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      access_token: req.params.token,
    });

    if (!token) return res.status(400).send("Invalid link");

    await User.findOneAndUpdate({ _id: user._id }, { verified: true });

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

// Logout
exports.logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(404);

  const token = await Token.findOneAndUpdate(
    { refresh_token: refreshToken },
    { refresh_token: "", access_token: "" },
    { new: true }
  );
  if (!token) return res.sendStatus(404);

  res.status(200).send("User Successfully logged out");
};
