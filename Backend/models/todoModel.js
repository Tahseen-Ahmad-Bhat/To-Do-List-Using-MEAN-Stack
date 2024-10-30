const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
