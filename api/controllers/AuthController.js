/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

 function onPassportAuth(req, res, error, user, info)
 {

   if (error) {
     return res.serverError(error);
   }
   if (!user) {
     return res.unauthorized(null, info && info.code, info && info.message);
   }

   return res.ok({
       token: SecurityService.createToken(user),
       user: user
     }
   )
 }

module.exports = {
	signin : function(req, res) {
    passport.authenticate('local', onPassportAuth.bind(this, req, res))(req, res);
  },

  signup : function(req, res) {
    User
      .create(_.omit(req.allParams(), 'id')).exec(function(err, user) {
				if (err) {
					return res.serverError(err);
				}

        Entity.create({
          user: user
        }).exec(function(err, newEntity){
          if (err) { return res.serverError(err); }

          User.update({id: user.id}, {
            entity: newEntity
          }).exec(function(err, updatedUser){
            if (err) { return res.serverError(err); }
  				  return res.created(updatedUser);
          });
        });
			});
  }
};
