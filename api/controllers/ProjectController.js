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
		Project.findOne({ id: req.param('projectId') }).exec(function(err, project) {
			if (err) { return res.serverError(err); }
			if (!project) { return res.notFound('No project found for this id'); }

			Entity.findOne({ id: project.moa }).exec(function(err, entity) {
				if (err) { return res.serverError(err); }
				if (!entity) { return res.notFound('No entity found for this id'); }

					var obj = entity.toJSON();

					if (obj.type == 'user') {
						User.findOne({
							id: obj.elementId
						}).exec(function(err, user) {
							if (!err && user) {
								obj.associatedElement = user.toJSON();
								delete obj.elementId;

								Log.create({
									description: 'A project has been requested : ' + project.description
								}).exec(function(err, log){
									if (err) { return res.serverError(err); }

									var elt = project.toJSON();

									elt.moa = obj;

									return res.ok(elt);
								});
							}
						});
					} else if (obj.type == 'society') {
						Society.findOne({
							id: obj.elementId
						}).exec(function(err, society) {
							if (!err && society) {
								obj.associatedElement = society.toJSON();
								delete obj.elementId;

								Log.create({
									description: 'A project has been requested : ' + project.description
								}).exec(function(err, log){
									if (err) { return res.serverError(err); }

									var elt = project.toJSON();

									elt.moa = obj;

									return res.ok(elt);
								});
							}
						});
					}
			});
		});
	}
};
