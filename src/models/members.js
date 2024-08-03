const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
  name: {
    unique: true,
    required: true,
    type: String,
  },
  penalized: {
    type: Boolean,
  },
  list_borrow_books: [
    {
      code: {
        type: String,
      },
      borrowedTime: {
        type: Date,
      },
    },
  ],
});

const members = mongoose.model("members", MemberSchema);
module.exports = members;
