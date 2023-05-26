const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      uppercase: true
    },
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validator: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: true
    },
    passwordConfirm: {
      type: String,
      required: false,
      minlength: 5,
      select: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    birthYear: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
