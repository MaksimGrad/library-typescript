import { Book } from '../models/book';
import { Author } from '../models/author';

export class BookController {

	public GetBooks = function (req, resp) {
		Book.FindAll(function (err, result) {
			if (err) throw err;
			resp.render('book-list', { books: result });
		})
	}

	public ToAddingBook = function (req, resp) {
		Author.FindAll(function (err, result) {
			if (err) throw err;
			resp.render('add-book', { authors: result });
		})
	}

	public AddBook = function (req, resp) {
		let book: Book = new Book(req.body.bookName, req.body.authorId);
		book.Create(book, function (err, result) {
			if (err) throw err;
			resp.redirect('/books/book-list');
		})
	}

	public ToEditingBook = function (req, resp) {
		var book: Book = new Book();
		book.Id = req.params.id;
		book.FindById(book.Id, function (err, book) {
			if (err) throw err;
			Author.FindAll(function (err, authors) {
				if (err) throw err;
				resp.render('edit-book', { book: book, authors: authors });
			})
		})
	}

	public EditBook = function (req, resp) {
		var book: Book = new Book(req.body.bookName, req.body.authorId, req.body.id);
		book.Update(book, function (err, result) {
			if (err) throw err;
			resp.redirect('/books/book-list');
		})
	}

	public DeleteBook = function (req, resp) {
		var book: Book = new Book();
		book.Id = req.params.id;
		book.Delete(book.Id, function (err, result) {
			if (err) throw err;
			resp.redirect('/books/book-list');
		})
	}
}