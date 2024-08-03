const MembersModel = require("../models/members");
const BooksModel = require("../models/books");

const getMembers = async (req, res) => {
  try {
    let product;
    if (req.query.queryByName) {
      product = await MembersModel.find({
        name: { $regex: req.query.queryByName },
      }).sort({ _id: -1 });
    } else {
      product = await MembersModel.find().sort({ _id: -1 });
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

const createMembers = async (req, res) => {
  console.log("ke trigger");
  const { name } = req.body;

  const newMember = new MembersModel({
    name,
    penalized: false,
    list_borrow_books: [],
  });

  try {
    await newMember.save();
    res.status(201).json({
      message: "create member Succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const borrowBooks = async (req, res) => {
  const { name, code } = req.body;

  const findBook = await BooksModel.find({ code: code });
  const checkUserHasBorrowTheBook = await MembersModel.find({
    list_borrow_books: { $elemMatch: { code: code } },
  });

  const checkUser = await MembersModel.find({
    name: name,
  });

  const userBorrowThanThreeBooks = await MembersModel.find({
    name: name,
    "list_borrow_books.1": { $exists: true },
  });

  if (findBook.length === 0) {
    return res.status(404).json({ message: "books not found" });
  }

  if (checkUserHasBorrowTheBook.length > 0) {
    return res.status(400).json({ message: "book is being borrow" });
  }
  if (checkUser.length === 0 || checkUser[0].penalized) {
    return res
      .status(400)
      .json({ message: "user not found or user being penalized" });
  }
  if (userBorrowThanThreeBooks.length > 0) {
    return res
      .status(404)
      .json({ message: "you cant borrow more than 2 books" });
  }

  try {
    const borrowBookStatus = await MembersModel.findOneAndUpdate(
      {
        name: name,
      },
      {
        $push: {
          list_borrow_books: {
            code: findBook[0].code,
            borrowedTime: Date.now(),
          },
        },
      },
      {
        new: true,
      }
    );
    if (borrowBookStatus) {
      await BooksModel.findOneAndUpdate(
        { code: code },
        { $inc: { stock: -1 } },
        { new: true }
      );
    }

    console.log("borrowBookStatus:", borrowBookStatus);
    res.status(201).json({ message: `succesfully borrow a books` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// const deleteMembers = async (req, res) => {
//   const id = req.query.id;

//   try {
//     const product = await BooksModel.findOneAndDelete({ _id: id });
//     if (!product) return res.status(404).json({ message: "product not found" });
//     res.status(201).json({ message: `deleted product with id : ${id}` });
//   } catch (error) {
//     res.status(402).json({ message: error.message });
//   }
// };

module.exports = {
  getMembers,
  createMembers,
  borrowBooks,
  //  deleteMembers, updateMembers
};
