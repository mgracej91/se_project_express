const mongoose = require("mongoose");

const { Schema } = mongoose;
const validator = require("validator");
const { find } = require("./clothingItem");
const { errorHandler } = require("../utils/errors");

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Invalid email or password"));
      }
      return user;
    })
    .catch((err) => {
      errorHandler(err);
      return Promise.reject(err);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
