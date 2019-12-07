import { User } from '../models/user';

export class UserController {

	public GetUsers = function (req, resp) {
		User.FindAll(function (err, result) {
			if (err) throw err;
			resp.render('user-list', { users: result });
		})
	}

	public ToAddingUser = function (req, resp) {
		resp.render('add-user');
	}

	public AddUser = function (req, resp) {
		var user: User = new User(req.body.name, req.body.surname);
		user.Create(user, function (err, result) {
			if (err) throw err;
			resp.redirect('/users/user-list');
		})
	}

	public ToEditingUser = function (req, resp) {
		var user: User = new User();
		user.Id = req.params.id;
		user.FindById(user.Id, function (err, result) {
			if (err) throw err;
			resp.render('edit-user', { user: result });
		})
	}

	public EditUser = function (req, resp) {
		var user: User = new User(req.body.name, req.body.surname, req.body.id);
		user.Update(user, function (err, result) {
			if (err) throw err;
			resp.redirect('/users/user-list');
		})
	}

	public DeleteUser = function (req, resp) {
		var user: User = new User();
		user.Id = req.params.id;
		user.Delete(user.Id, function (err, result) {
			if (err) throw err;
			resp.redirect('/users/user-list');
		})
	}
}