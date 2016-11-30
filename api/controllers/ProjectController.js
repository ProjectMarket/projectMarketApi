/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createProject: function (req, res) {
		User.findOne({
			id: req.param('id')
		}).exec(function (err, user) {
			if (err) { return next(error, false, { code: 'E_NO_DATABASE_CONNECTION', message: 'connection à la base de données impossible' }); }
      if (!user) { return next(null, false, { code: 'E_USER_NOT_FOUND', message: 'user not found' }); }

			Project.create({
				moa: user,
				budget: req.param('budget'),
				description: req.param('description')
			}).exec(function (err, newProject) {
				if (err) { return next(error, false, { code: 'E_NO_DATABASE_CONNECTION', message: 'connection à la base de données impossible' }); }
				if (!newProject) { return next(null, false, { code: 'E_PROJECT_NOT_CREATED', message: 'user could not be created' }); }

				return res.created(newProject);
			});
		});
	},
	getProject: function (req, res) {
		Project.findOne({ id: req.param('projectId') }).populate('moa').exec(function(err, project) {
			if (err) { return res.serverError(err); }
			if (!project) { return res.notFound('No project found for this id'); }

			return res.ok(project);
		});
	}
};
