import express = require("express");
import bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

let userController: UserController = new UserController();

userRouter.get("/user-list", userController.GetUsers);
userRouter.get("/add-user", userController.ToAddingUser);
userRouter.post("/add-user", urlencodedParser, userController.AddUser);
userRouter.get("/edit-user/:id", userController.ToEditingUser);
userRouter.post("/edit-user", urlencodedParser, userController.EditUser);
userRouter.get("/delete-user/:id", userController.DeleteUser);

export { userRouter as UserRouter };