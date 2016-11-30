/**
 * SocietyController
 *
 * @description :: Server-side logic for managing societies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createSociety: function (req, res) {
		User.findOne({
			id: req.param('id')
		}).exec(function(error, user) {
			if (error) {
				return next(error, false, {
          code: 'E_NO_DATABASE_CONNECTION',
          message: 'connection à la base de données impossible'
        });
			}
      if (!user) {
        return next(null, false, {
          code: 'E_USER_NOT_FOUND',
          message: 'user not found'
        });
      }
			Society.create({
				legalname: req.param('legalname'),
				address: req.param('address'),
				admin: user
			}).exec(function(err, newSociety) {
				if (err) {
					return res.serverError(err);
				}
				User.update({id: req.param('id')},{
					societyAdmin: newSociety
				}).exec(function(err, updatedUser) {
					if (err) {
						return res.serverError(err);
					}
					user.save(function(err) {
						if (err) { return res.serverError(err); }
						Entity.create({
							society: newSociety
						}).exec(function(err, newEntity) {
							if (err) { return res.serverError(err); }

							Society.update({id: newSociety.id},{
								entity: newEntity
							}).exec(function(err, updatedSociety) {
								if (err) { return res.serverError(err); }
								return res.ok(updatedSociety);
							});
						});
					});
				});
			});
		});
	},
	addMember: function(req, res) {
		Society.findOne({ id: req.param('societyId') }).populate('members').exec(function(err, society) {
			if (err) { return res.serverError(err); }
			if (!society) { return res.notFound('No society for this id'); }

			User.findOne({ id: req.param('userId') }).exec(function(err, user) {
				if (err) { return res.serverError(err); }
				if (!user) { return res.notFound('No user found for this id'); }

				society.members.add(user.id);
				society.save(function(err) {
					if (err) { return res.serverError(err); }
					user.societyMember = society.id;
					user.save(function(err) {
						if (err) { return res.serverError(err); }
						return res.ok();
					});
				});
			});
		});
	},
	getSociety: function(req, res) {
		Society.findOne({ id: req.param('societyId') }).exec(function(err, society) {
			if (err) { return res.serverError(err); }
			if (!society) { return res.notFound('No society found for this id'); }

			return res.ok(society);
		});
	},
	getMembers: function(req, res) {
		Society.findOne({ id: req.param('societyId') }).populate('members').exec(function(err, society) {
			if (err) { return res.serverError(err); }
			if (!society) { return res.notFound('No society found for this id'); }

			return res.ok(society.members);
		});
	}
};
