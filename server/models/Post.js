const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Post title is required"],
    },
    body: {
      type: String,
      trim: true,
      required: [true, "Post body is required"],
    },
    // author:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Author'
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
