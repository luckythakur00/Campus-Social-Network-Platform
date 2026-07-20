

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: {
      type: String,
      enum: ["student", "faculty", "alumni", "placement", "admin"],
      default: "student",
    },
    avatar: { type: String, default: "" },
    headline: { type: String, default: "Student" },
    batch: { type: String },
    company: { type: String },
  },
  { timestamps: true }, 
);

const User = mongoose.model("User", userSchema);

module.exports = User;
