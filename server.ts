import express = require('express');
var app = express();
import * as db from "./db";
import { HomeRouter } from "./routes/homeRouter";
import { BookRouter } from "./routes/bookRouter";
import { AuthorRouter } from "./routes/authorRouter";
import { UserRouter } from "./routes/userRouter";
import { UserBooksRouter } from "./routes/userBooksRouter";

app.set("view engine", "ejs");

app.use("/", HomeRouter);
app.use("/books", BookRouter);
app.use("/authors", AuthorRouter);
app.use("/users", UserRouter);
app.use("/user-books", UserBooksRouter);

db.databaseConn(function (err) {
	if (err) throw err;
	console.log("Connected to MySql!")

	app.listen(1337, function () {
		console.log('API app started');
	})
});