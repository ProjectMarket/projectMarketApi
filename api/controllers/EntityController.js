/**
 * EntityController
 *
 * @description :: Server-side logic for managing entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function (req, res) {
		res.send(req.entity);
	},
	getEntity: function(req, res) {
		Entity.findOne({ id: req.param('entityId') }).exec(function(err, entity) {
			if (err) { return res.serverError(err); }
			if (!entity) { return res.notFound('No entity found for this id'); }

			Log.create({
				description: 'An entity has been retrieved by id : ' + entity.email
			}).exec(function(err, log) {
				if (err) { return res.serverError(err); }

				var obj = entity.toJSON();

				if (obj.type == 'user') {
					User.findOne({
						id: obj.elementId
					}).exec(function(err, user) {
						if (!err && user) {
							obj.associatedElement = user.toJSON();
							delete obj.elementId;
							return res.ok(obj);
						}
					});
				} else if (obj.type == 'society') {
					Society.findOne({
						id: obj.elementId
					}).exec(function(err, society) {
						if (!err && society) {
							obj.associatedElement = society.toJSON();
							delete obj.elementId;
							return res.ok(obj);
						}
					});
				}
			});
		});
	},
	updateProfile: function(req, res) {
		Entity.findOne({ id: req.param('entityId') }).exec(function(err, entity) {
			if (err) { return res.serverError(err); }
			if (!entity) { return res.serverError('Entity not found'); }

			if (req.param('email') != null && req.param('email') != undefined && req.param('email') != "") {
				if (req.param('email') != null && req.param('email') != undefined && req.param('email') != "") {
					entity.email = req.param('email');
				}

				entity.save(function(err) {
					if (err) { return res.serverError(err); }
				});
			}

			if (entity.type == 'user') {
				User.findOne({
					id: entity.elementId
				}).exec(function(err, user) {
					if ((req.param('firstname') != null && req.param('firstname') != undefined && req.param('firstname') != "") || (req.param('lastname') != null && req.param('lastname') != undefined && req.param('lastname') != "") || (req.param('avatar') != null && req.param('avatar') != undefined && req.param('avatar') != "") || (req.param('address') != null && req.param('address') != undefined && req.param('address') != "") || (req.param('postalcode') != null && req.param('postalcode') != undefined && req.param('postalcode') != "") || (req.param('city') != null && req.param('city') != undefined && req.param('city') != "") || (req.param('country') != null && req.param('country') != undefined && req.param('country') != "")) {
						if (req.param('firstname') != null && req.param('firstname') != undefined && req.param('firstname') != "") {
							user.firstname = req.param('firstname');
						}
						if (req.param('lastname') != null && req.param('lastname') != undefined && req.param('lastname') != "") {
							entity.lastname = req.param('lastname');
						}
						if (req.param('avatar') != null && req.param('avatar') != undefined && req.param('avatar') != "") {
							entity.avatar = req.param('avatar');
						}
						if (req.param('address') != null && req.param('address') != undefined && req.param('address') != "") {
							entity.address = req.param('address');
						}
						if (req.param('postalcode') != null && req.param('postalcode') != undefined && req.param('postalcode') != "") {
							entity.postalcode = req.param('postalcode');
						}
						if (req.param('city') != null && req.param('city') != undefined && req.param('city') != "") {
							entity.city = req.param('city');
						}
						if (req.param('country') != null && req.param('country') != undefined && req.param('country') != "") {
							entity.city = req.param('country');
						}

						user.save(function(err) {
							if (err) { return res.serverError(err); }
						});
					}
				});
			} else if (entity.type == 'society') {
				Society.findOne({
					id: entity.elementId
				}).exec(function(err, society) {
					if ((req.param('legalname') != null && req.param('legalname') != undefined && req.param('legalname') != "") || (req.param('siretnumber') != null && req.param('siretnumber') != undefined && req.param('siretnumber') != "") || (req.param('avatar') != null && req.param('avatar') != undefined && req.param('avatar') != "") || (req.param('address') != null && req.param('address') != undefined && req.param('address') != "") || (req.param('postalcode') != null && req.param('postalcode') != undefined && req.param('postalcode') != "") || (req.param('city') != null && req.param('city') != undefined && req.param('city') != "") || (req.param('country') != null && req.param('country') != undefined && req.param('country') != "")) {
						if (req.param('legalname') != null && req.param('legalname') != undefined) {
							society.legalname = req.param('legalname');
						}
						if (req.param('siretnumber') != null && req.param('siretnumber') != undefined) {
							society.siretnumber = req.param('siretnumber');
						}
						if (req.param('avatar') != null && req.param('avatar') != undefined) {
							society.avatar = req.param('avatar');
						}
						if (req.param('address') != null && req.param('address') != undefined) {
							society.address = req.param('address');
						}
						if (req.param('postalcode') != null && req.param('postalcode') != undefined && req.param('postalcode') != "") {
							entity.postalcode = req.param('postalcode');
						}
						if (req.param('city') != null && req.param('city') != undefined && req.param('city') != "") {
							entity.city = req.param('city');
						}
						if (req.param('country') != null && req.param('country') != undefined && req.param('country') != "") {
							entity.city = req.param('country');
						}

						society.save(function(err) {
							if (err) { return res.serverError(err); }
						});
					}
				});
			}

			var obj = entity.toJSON();
			return res.ok(obj);
		});
	},
	updatePassword: function(req, res) {
		oldpassword
		newpassword
	}
};
