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

			Category.findOne({
				id: req.param('categoryId')
			}).exec(function (err, cat) {
				if (err) { return res.serverError('connection pour les catégories impossible'); }
				if (!cat) { return res.serverError('category could not be found'); }

				Project.create({
					moa: user,
					title: req.param('title'),
					budget: req.param('budget'),
					description: req.param('description'),
					category: cat
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
		});
	},
	getProject: function (req, res) {
		Project.findOne({ id: req.param('projectId') }).populate('category').populate('appliants').exec(function(err, project) {
			if (err) { return res.serverError(err); }
			if (!project) { return res.notFound('No project found for this id'); }

			var appls = [];

			async.each(project.appliants, function(appliant, cb) {

				Entity.findOne({id: appliant.id}).exec(function(err, appliantEntity) {
					if (err) { return cb(err); }

					var object = appliantEntity.toJSON();

					if (object.type == 'user') {
						User.findOne({
							id: object.elementId
						}).exec(function(err, user) {
							if (!err && user) {
								object.associatedElement = user.toJSON();
								delete object.elementId;
								appls.push(object);
								cb();
							}
						});
					} else if (object.type == 'society') {
						Society.findOne({
							id: object.elementId
						}).exec(function(err, society) {
							if (!err && society) {
								object.associatedElement = society.toJSON();
								delete object.elementId;
								appls.push(object);
								cb();
							}
						});
					}
				});

			}, function(err) {
				if (err) { return res.serverError(err); }

				var elt = project.toJSON();

				elt.appliants = appls;

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

										elt.moa = obj;

										if (project.moe != null) {
											Entity.findOne({ id: project.moe }).exec(function(err, entity) {
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

											            elt.moe = obj;

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

											            elt.moe = obj;

											            return res.ok(elt);
											          });
											        }
											      });
											    }
											});
										} else {
											return res.ok(elt);
										}
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

										elt.moa = obj;

										if (project.moe != null) {

										Entity.findOne({ id: project.moe }).exec(function(err, entity) {
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

										            elt.moe = obj;

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

										            elt.moe = obj;

										            return res.ok(elt);
										          });
										        }
										      });
										    }
										});
									} else {
										return res.ok(elt);
									}
									});
								}
							});
						}
				});
			});
		});
	},
	applyToProject: function (req, res) {
		Project.findOne({ id: req.param('projectId') }).exec(function(err, projet) {
			if (err) { return res.serverError(err); }
			if (!projet) { return res.serverError('Project could not be found'); }

			Entity.findOne({ id: req.param('entityId') }).exec(function(err, entity) {
				if (err) { return res.serverError(err); }
				if (!entity) { return res.serverError('Entity could not be found'); }

				if (entity.type != 'society') { return res.serverError('Only a society can apply to aproject'); }

				projet.appliants.add(entity.id);
				projet.save(function(err) {
					if (err) { return res.serverError(err); }

					var message = req.param('message');

					if (message != null && message != undefined && message != "") {
						Message.create({
							description: message,
							receiver: projet.moa,
							read: false
						}).exec(function(err, mes) {
							if (err) { return res.serverError(err); }
							if (!mes) { return res.serverError('Message could not be written'); }
						});
					}

					Notification.create({
						description: entity.email + ' has applied to project : ' + projet.title,
						receiver: projet.moa,
						read: false
					}).exec(function(err, not) {
						if (err) { return res.serverError(err); }
						if (!not) { return res.serverError('Notification could not be written'); }

						Log.create({
							description: 'Entity : ' + entity.email + ' has applied to project : ' + projet.title
						}).exec(function(err, log){
							if (err) { return res.serverError(err); }

							return res.ok(projet);
						});
					});
				});
			});
		});
	},
	removeAppliance: function(req, res) {
		Project.findOne({ id: req.param('projectId') }).populate('appliants').exec(function(err, project){
			if (err) { return res.serverError(err); }
			if (!project) { return res.serverError('Project could not be found'); }

			Entity.findOne({ id: req.param('entityId') }).exec(function(err, entity){
				if (err) { return res.serverError(err); }
				if (!entity) { return res.serverError('Entity could not be found'); }

				project.appliants.remove(req.param('entityId'));
				project.save();

				return res.ok(project);
			});
		});
	},
	selectMoeForProject: function(req, res) {
			Project.findOne({ id: req.param('projectId') }).populate('appliants').exec(function(err, project){
				if (err) { return res.serverError(err); }
				if (!project) { return res.serverError('Project could not be found'); }

				Entity.findOne({ id: req.param('entityId') }).exec(function(err, entity){
					if (err) { return res.serverError(err); }
					if (!entity) { return res.serverError('Entity could not be found'); }

					var id = [];

					async.each(project.appliants, function(appliant, cb) {

						id.push(appliant.id);
						cb();

					}, function(err) {
						if (err) { return res.serverError(err); }

						for (var i = 0; i < id.length; i++) {
							project.appliants.remove(id[i]);
						}

						project.moe = req.param('entityId');
						project.started = new Date().toLocaleString();
						project.save();

						return res.ok(project);

					})
				});
			});
	},
	endProject: function(req, res) {
		Project.findOne({ id: req.param('projectId') }).populate('appliants').exec(function(err, project){
			if (err) { return res.serverError(err); }
			if (!project) { return res.serverError('Project could not be found'); }

			project.over = new Date().toLocaleString();
			project.save();

			return res.ok(project);
		});
	}
};
