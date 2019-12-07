import express = require("express");
import bodyParser = require('body-parser');
import * as homeController from "../controllers/home.controller";
const HomeRouter = express.Router();

HomeRouter.get("/", homeController.index);

export { HomeRouter };