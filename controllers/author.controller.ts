import { Author } from '../models/author';

export class AuthorController {

	public GetAuthors = function (req, resp) {
		Author.FindAll(function (err, result) {
			if (err) throw err;
			resp.render('author-list', { authors: result });
		})
	}

	public ToAddingAuthor = function (req, resp) {
		resp.render('add-author');
	}

	public AddAuthor(req, resp) {
		let author: Author = new Author(req.body.name, req.body.surname);
		author.Create(author, function (err, result) {
			if (err) throw err;
			resp.redirect('/authors/author-list');
		})
	}

	public ToEditingAuthor(req, resp) {
		let author: Author = new Author();
		author.Id = req.params.id;
		author.FindById(author.Id, function (err, result) {
			if (err) throw err;
			resp.render('edit-author', { author: result });
		})
	}

	public EditAuthor(req, resp) {
		let author: Author = new Author(req.body.name, req.body.surname, req.body.id);
		author.Update(author, function (err, result) {
			if (err) throw err;
			resp.redirect('/authors/author-list');
		})
	}

	public DeleteAuthor(req, resp) {
		let author: Author = new Author();
		author.Id = req.params.id;
		author.Delete(author.Id, function (err, result) {
			if (err) throw err;
			resp.redirect('/authors/author-list');
		})
	}
}
