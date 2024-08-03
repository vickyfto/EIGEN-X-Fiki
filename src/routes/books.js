/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         code:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The auto-generated id of the book
 *         author:
 *           type: string
 *           description: The title of your book
 *         stock:
 *           type: number
 *           description: Whether you have finished reading the book
 */
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     parameters:
 *      - in: query
 *        name: bookCode
 *        schema:
 *          type: string
 *        description: query book by their code
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        description: for pagination
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete book by code
 *     tags: [Books]
 *     parameters:
 *      - in: query
 *        name: code
 *        schema:
 *          type: string
 *        description: delete book by field code
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Some server error
 *   put:
 *     summary: edit book
 *     tags: [Books]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Some server error
 * /book/return:
 *   post:
 *    summary: return book
 *    tags: [Books]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

const express = require("express");
const {
  getBooks,
  createBooks,
  deleteBook,
  updateBook,
  returnBook,
} = require("../controllers/books.js");

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBooks);
router.post("/return", returnBook);
router.delete("/", deleteBook);
router.put("/", updateBook);

module.exports = router;
