const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    unique: true,
    required: true,
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
});

const books = mongoose.model("books", BookSchema);
module.exports = books;
