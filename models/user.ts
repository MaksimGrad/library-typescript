import * as db from "../db";

export class User {

	private id: number;
	private name: string;
	private surname: string;

	constructor(name: string = "", surname: string = "", id = null) {
		this.name = name;
		this.surname = surname;
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
		"SELECT * FROM users Order by surname";
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	public FindById(id: number, cb) {
		let query: string = `SELECT * FROM users WHERE id = ${id}`;
		db.getDatabase().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	public Create(user: User, cb) {
		db.getDatabase().query('INSERT INTO users SET ?', user, function(err, result) {
			cb(err, result);
		})
	}

	public Update(user: User, cb) {
		let query: string = `UPDATE users SET ? WHERE id = ${user.id}`;
		db.getDatabase().query(query, user, function(err, result) {
			cb(err, result);
		})
	}

	public Delete(id: number, cb) {
		let query: string = `DELETE FROM users WHERE id = ${id}`;
		db.getDatabase().query(query, function(err, result) {
			cb(err, result);
		})
	}
}