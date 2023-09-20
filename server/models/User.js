const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "usernameis required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "User password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
