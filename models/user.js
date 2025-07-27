const mongoose = require("mongoose");

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
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: "You must enter a valid URL",
      },
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
