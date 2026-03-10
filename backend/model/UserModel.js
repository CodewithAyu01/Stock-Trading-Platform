const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Extra: Portfolio tracking ke liye baad mein use kar sakte hain
  funds: {
    type: Number,
    default: 100000, // Dummy starting cash: 1 Lakh
  }
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };