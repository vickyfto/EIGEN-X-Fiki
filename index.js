require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const cors = require("cors");
app.use(cors());

const port = 5000;
// const url = process.env.DB_URL
// PLEASE READ THIS!!!!
// TESTING PHASES, THIS SHOULD BE HIDE IN FILE ENV
const url =
  "mongodb+srv://crownempire25:LolXoIIqnKvK7HHU@cluster0.zdg1grz.mongodb.net";

mongoose.connect(url, {
  dbName: "db-interview",
});
const con = mongoose.connection;
app.use(express.json());

try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

const books = require("./src/routes/books");
const members = require("./src/routes/members");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arif Books Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "skills with arif",
        url: "arif.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

app.use("/books", books);
app.use("/members", members);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log("Server started");
});
