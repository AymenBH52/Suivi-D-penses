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
      res.status(500).json({ message: 'Username or email is already used!' });
    });
};

module.exports = {
  login,
  register,
};
