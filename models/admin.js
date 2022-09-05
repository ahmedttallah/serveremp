const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: Array,
    required: [true, "Email required"],

    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Password required"],
    min: 8,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
