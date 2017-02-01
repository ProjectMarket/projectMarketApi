/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createProject: function (req, res) {
		Entity.findOne({
			id: req.param('id')
		}).exec(function (err, user) {
			if (err) { return res.serverError('connection 1 à la base de données impossible'); }
      if (!user) { return res.serverError('user not found'); }

			Project.create({
				moa: user,
				title: req.param('title'),
				budget: req.param('budget'),
				description: req.param('description')
			}).exec(function (err, newProject) {
				if (err) { return res.serverError('connection 2 à la base de données impossible'); }
				if (!newProject) { return res.serverError('user could not be created'); }

				Log.create({
					description: 'A project has been created : ' + newProject.description
				}).exec(function(err, log){
					if (err) { return res.serverError(err); }

					return res.created(newProject);
				});
			});
		});
	},
	getProject: function (req, res) {
		Project.findOne({ id: req.param('projectId') }).populate('moa').exec(function(err, project) {
			if (err) { return res.serverError(err); }
			if (!project) { return res.notFound('No project found for this id'); }

			Log.create({
				description: 'A project has been requested : ' + project.description
			}).exec(function(err, log){
				if (err) { return res.serverError(err); }

				return res.ok(project);
			});
		});
	}
};
