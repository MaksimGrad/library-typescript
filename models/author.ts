import * as db from "../db";

export class Author {

	private id: number;
	private authorName: string;
	private authorSurname: string;

	constructor(authorName: string = "", authorSurname: string = "", id: number = null) {
		this.authorName = authorName;
		this.authorSurname = authorSurname;
		if (id !== null) this.id = id;
	}

	public get Id() {
		return this.id;
	}

	public set Id(id: number) {
		this.id = id;
	}

	public static FindAll(cb) {
		let query: string = "SELECT * FROM authors Order by authorSurname";
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	public FindById(id: number, cb) {
		let query: string = `SELECT * FROM authors WHERE id = ${id}`;
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	public Create(author: Author, cb) {
		db.getDatabase().query('INSERT INTO authors SET ?', author, function (err, result) {
			cb(err, result);
		})
	}

	public Update(author: Author, cb) {
		let query: string = `UPDATE authors SET ? WHERE id = ${author.id}`;
		db.getDatabase().query(query, author, function (err, result) {
			cb(err, result);
		})
	}

	public Delete(id: number, cb) {
		let query = `DELETE FROM authors WHERE id = ${id}`;
		db.getDatabase().query(query, function (err, result) {
			cb(err, result);
		})
	}
}
