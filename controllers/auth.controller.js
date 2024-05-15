const bcrypt = require('bcrypt');
const user = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username && !password)
      return res.status(400).json({ message: 'Content cannot be empty' });

    const authUser = await user.findOne({ username });

    if (!authUser) {
      return res.status(401).json({ message: 'User not found!' });
    }

    const isMatch = bcrypt.compare(password, authUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    } else {
      const token = jwt.sign(
        { id: authUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );

      return res.status(200).json({ token, _id: authUser._id, username });
    }
  } catch (error) {
    console.log(error);
  }
};

const validateEmptyFields = (email, username, password) => {
  if (username == '' || password == '' || email == '') return false;
  else return true;
};

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.body);

  if (validateEmptyFields(email, username, password) == false) {
    return res
      .status(400)
      .json({ message: 'Content cannot be empty', content: req.body });
  }
  const newUser = new user({
    username: username,
    password: password,
    email: email,
  });
  newUser
    .save()
    .then((savedUser) => {
      res
        .status(201)
        .json({ message: `User ${savedUser.username} created successfully` });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: error, message: 'Username or email is already used!' });
    });
};
let users;
async () => {
  console.log('aaa');
  users = await User.find();
};
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  let users = await user.find({ email: email });
  if (users[email]) {
    const token = crypto.randomBytes(20).toString('hex');
    users[email].resetToken = token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:4200/reset-password/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res
          .status(200)
          .send('Check your email for instructions on resetting your password');
      }
    });
  } else {
    res.status(404).send('Email not found');
  }
};
// Route to handle the reset token
const resetToken = async (req, res) => {
  const { token } = req.params;
  // Check if the token exists and is still valid
  if (users.some((user) => user.resetToken === token)) {
    // Render a form for the user to enter a new password
    res.send(
      '<form method="post" action="/reset-password"><input type="password" name="password" required><input type="submit" value="Reset Password"></form>',
    );
  } else {
    res.status(404).send('Invalid or expired token');
  }
};
// Route to update the password
const resetPassword = (req, res) => {
  const { token, password } = req.body;
  // Find the user with the given token and update their password
  const user = users.find((user) => user.resetToken === token);
  if (user) {
    user.password = password;
    delete user.resetToken; // Remove the reset token after the password is updated
    res.status(200).send('Password updated successfully');
  } else {
    res.status(404).send('Invalid or expired token');
  }
};
module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  resetToken,
};
