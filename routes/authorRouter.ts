import express = require("express");
import bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
import { AuthorController } from "../controllers/author.controller";
const authorRouter = express.Router();

let authorController: AuthorController = new AuthorController();

authorRouter.get("/author-list", authorController.GetAuthors);
authorRouter.get("/add-author", authorController.ToAddingAuthor);
authorRouter.post("/add-author", urlencodedParser, authorController.AddAuthor);
authorRouter.get("/edit-author/:id", authorController.ToEditingAuthor);
authorRouter.post("/edit-author", urlencodedParser, authorController.EditAuthor);
authorRouter.get("/delete-author/:id", authorController.DeleteAuthor);

export { authorRouter as AuthorRouter };