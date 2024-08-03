/**
 * @swagger
 * components:
 *   schemas:
 *     Members:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The auto-generated id of the book
 *         penalized:
 *           type: boolean
 *           description: The auto-generated id of the book
 *         list_borrow_books:
 *           type: array
 *           description: The title of your book
 *
 * @swagger
 * tags:
 *   name: Members
 *   description: The Members managing API
 * /members:
 *   get:
 *     summary: Lists all the Members
 *     tags: [Members]
 *     parameters:
 *      - in: query
 *        name: queryByName
 *        schema:
 *          type: string
 *        description: query member by their name
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
 *                 $ref: '#/components/schemas/Members'
 *   post:
 *     summary: Create a new book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Members'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Members'
 *       500:
 *         description: Some server error
 * /members/borrow:
 *   post:
 *    summary: return book
 *    tags: [Members]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Members'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Members'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

const express = require("express");
const {
  getMembers,
  createMembers,
  borrowBooks,
} = require("../controllers/members.js");

const router = express.Router();

router.get("/", getMembers);
router.post("/", createMembers);
router.post("/borrow", borrowBooks);

module.exports = router;
