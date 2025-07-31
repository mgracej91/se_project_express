const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { errorHandler } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
console.log("User controller loaded");
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password; // Exclude password from response
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email })
    .select("+password")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};
const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getUsers,
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
