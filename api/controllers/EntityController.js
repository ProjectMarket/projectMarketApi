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
	}
};
