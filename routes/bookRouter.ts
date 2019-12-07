import express = require("express");
import bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
import { BookController } from "../controllers/book.controller";
const bookRouter = express.Router();

let bookController: BookController = new BookController();

bookRouter.get("/book-list", bookController.GetBooks);
bookRouter.get("/add-book", bookController.ToAddingBook);
bookRouter.post("/add-book", urlencodedParser, bookController.AddBook);
bookRouter.get("/edit-book/:id", bookController.ToEditingBook);
bookRouter.post("/edit-book", urlencodedParser, bookController.EditBook);
bookRouter.get("/delete-book/:id", bookController.DeleteBook);

export { bookRouter as BookRouter };