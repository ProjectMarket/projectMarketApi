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

			return res.ok(user);
		});
	}
};
