import * as db from "../db";

export class Book {

	private id: number;
	private name: string;
	private authorId: number;

	constructor(name: string = "", authorId: number = null, id: number = null) {
		this.name = name;
		this.authorId = authorId;
		if (id !== null) this.id = id;
	}

	public get Id() {
		return this.id;
	}

	public set Id(id: number) {
		this.id = id;
	}

	public static FindAll(cb) {
		let query: string = 
		`SELECT b.*, a.authorSurname, a.authorName 
		FROM books as b 
		LEFT JOIN authors as a on b.authorId = a.id`;
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	public FindById(id: number, cb) {
		let query: string = `SELECT * FROM books WHERE id = ${id}`;
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	public Create(book: Book, cb) {
		db.getDatabase().query('INSERT INTO books SET ?', book, function(err, result) {
			cb(err, result);
		})
	}

	public Update(book: Book, cb) {
		let query: string = `UPDATE books SET ? WHERE id = ${book.id}`;
		db.getDatabase().query(query, book, function(err, result) {
			cb(err, result);
		})
	}

	public Delete(id: number, cb) {
		let query: string = `DELETE FROM books WHERE id = ${id}`;
		db.getDatabase().query(query, function(err, result) {
			cb(err, result);
		})
	}
}