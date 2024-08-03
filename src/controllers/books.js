const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const BooksModel = require("../models/books");
const MemberModel = require("../models/members");

const getBooks = async (req, res) => {
  try {
    let product;
    if (req.query.bookCode) {
      product = await BooksModel.find({
        code: { $regex: req.query.bookCode },
      }).sort({ _id: -1 });
    } else {
      product = await BooksModel.find().sort({ _id: -1 });
    }

    const pageCount = Math.ceil(product.length / 10);
    let page = parseInt(req.query.page);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }

    res.status(200).json({
      page: page,
      pageCount: pageCount,
      data: product.slice(page * 10 - 10, page * 10),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBooks = async (req, res) => {
  const { title, author, stock } = req.body;
  let randomString = (Math.random() + 1).toString(36).substring(7);

  const newProduct = new BooksModel({
    title,
    author,
    code: randomString,
    stock,
  });

  try {
    await newProduct.save();
    res.status(201).json({
      message: "Book Created Succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  const { code, borrowDate } = req.body;

  const getMember = await MemberModel.find({
    list_borrow_books: { $elemMatch: { code: code } },
  });

  // when create date and send it from client should
  // be hash to prevent manual request from hacker
  const currentDate = new Date();
  const borrow = new Date(borrowDate);
  const addAweekFromBorrowDate = new Date(
    borrow.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  // check if borrowDate is pass in 1 week
  if (addAweekFromBorrowDate > currentDate) {
    try {
      const findAndDeleteBook = await MemberModel.updateOne(
        { "list_borrow_books.code": code },
        { $pull: { list_borrow_books: { code: code } } }
      );
      if (findAndDeleteBook.modifiedCount > 0) {
        await BooksModel.findOneAndUpdate(
          { code: code },
          { $inc: { stock: +1 } },
          { new: true }
        );
        res.status(200).send({ message: "Book has been return" });
      } else {
        res.status(404).send({ message: "Book not found" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("masuk else");
  }
};

const updateBook = async (req, res) => {
  const { code, title, author, stock } = req.body;

  try {
    await BooksModel.findOneAndUpdate(
      {
        code: code,
      },
      {
        title,
        author,
        stock,
      }
    );
    res.status(202).json({ message: `book ${code} succesfully update` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const code = req.query.code;

  try {
    const product = await BooksModel.findOneAndDelete({ code: code });
    if (!product) return res.status(404).json({ message: "product not found" });
    res.status(201).json({ message: `deleted book with code : ${code}` });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  createBooks,
  deleteBook,
  updateBook,
  returnBook,
};
