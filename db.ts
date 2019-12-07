import mysql = require('mysql');

var state = {
	db: null
};

function databaseConn(done) {
	if (state.db) {
		return done();
	}

	let database = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "library_db"
	});

	database.connect(function (err) {
		if (err) {
			return done(err);
		}
		state.db = database;
		done()
	});
}

var getDatabase = function() {
	return state.db;
}

export { databaseConn, getDatabase };