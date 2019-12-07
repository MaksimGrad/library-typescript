import * as db from "../db";

export class UserBook {

	private id: number;
	private bookId: number;
	private userId: number;

	constructor(bookId: number = null, userId: number = null, id = null) {
		this.bookId = bookId;
		this.userId = userId;
		if (id !== null) this.id = id;
	}

	public get UserId() {
		return this.userId;
	}

	public set UserId(userId: number) {
		this.userId = userId;
	}

	public static FindByUserId(id: number, cb) {
		let query: string = 
		`SELECT d.*, b.name, a.authorName, a.authorSurname 
		FROM book_delivery as d 
		LEFT JOIN books as b on d.bookId = b.Id 
		LEFT JOIN authors as a on b.authorId = a.id 
		WHERE d.userId = ${id}
		Order by d.issue_date DESC`;

		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	public static FindById(id: number, cb) {
		let query: string = `SELECT * FROM book_delivery WHERE id = ${id}`;
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	public Create(userBook: UserBook, cb) {
		db.getDatabase().query('INSERT INTO book_delivery SET ?', userBook, function(err, result) {
			cb(err, result);
		})
	}

	public static Update(userBook: UserBook, cb) {
		let query: string = `UPDATE book_delivery SET ? WHERE id = ${userBook.id}`;
		db.getDatabase().query(query, userBook, function(err, result) {
			cb(err, result);
		})
	}
}