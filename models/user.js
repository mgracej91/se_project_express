const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const validator = require("validator");

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

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select("password");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.name = "UnauthorizedError";
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.name = "UnauthorizedError";
      throw error;
    }
    user.password = undefined;
    return user;
  } catch (error) {
    error.name = "UnauthorizedError";
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
