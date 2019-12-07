import express = require("express");
import bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
import { UserBookController } from "../controllers/user-books.controller";
const userBooksRouter = express.Router();

let userBooksController: UserBookController = new UserBookController();

userBooksRouter.get("/user-books-list/:id", userBooksController.GetBooksByUserId);
userBooksRouter.post('/add-user-book', urlencodedParser, userBooksController.AddUserBook);
userBooksRouter.get('/return-book/:id', userBooksController.EditUserBook);

export { userBooksRouter as UserBooksRouter };