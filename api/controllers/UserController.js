/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function (req, res) {
		return res.send(req.user);
	},
	getUser: function (req, res) {
		User.findOne({ id: req.param('userId') }).exec(function(err, user){
			if (err) { return res.serverError(err); }
			if (!user) { return res.notFound('No user found for this id'); }

			Log.create({
				description: 'A user has been retrieved by id: ' + user.email
			}).exec(function(err, log){
				if (err) { return res.serverError(err); }

				return res.ok(user);
			});
		});
	}
};
