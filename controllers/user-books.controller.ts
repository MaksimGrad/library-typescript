import { UserBook } from '../models/user-book';
import { User } from '../models/user';
import { Book } from '../models/book';

export class UserBookController {

	public GetBooksByUserId = function (req, resp) {
		var id: number = req.params.id;
		UserBook.FindByUserId(id, function (err, books) {
			if (err) throw err;
			let user: User = new User();
			user.FindById(id, function (err, user) {
				if (err) throw err;
				Book.FindAll(function (err, allBooks) {
					if (err) throw err;
					resp.render('user-books-list', { userbooks: books, user: user, books: allBooks });
				})
			})
		})
	}

	public AddUserBook = function (req, resp) {
		let userBook: UserBook = new UserBook(req.body.bookId, req.body.userId);
		userBook.Create(userBook, function (err, result) {
			if (err) throw err;
			resp.redirect(`/user-books/user-books-list/${userBook.UserId}`);
		})
	}

	public EditUserBook = function (req, resp) {
		var id: number = req.params.id;
		UserBook.FindById(id, function (err, userBook) {
			if (err) throw err;

			let cur: Date = new Date();
			userBook[0]['return_date'] = `${cur.getFullYear()}.${cur.getMonth() + 1}.${cur.getDate()} 
			${cur.getHours()}:${cur.getMinutes()}:${cur.getSeconds()}`;

			UserBook.Update(userBook[0], function (err, result) {
				if (err) throw err;
				resp.redirect(`/user-books/user-books-list/${userBook[0].userId}`);
			})
		})
	}
}