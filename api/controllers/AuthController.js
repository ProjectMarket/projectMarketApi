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
    if (req.param('type') == 'user'){
      User.create({
        firstname: req.param('firstname'),
        lastname: req.param('lastname'),
        avatar: req.param('avatar'),
        address: req.param('address')
      }).exec(function(err, user) {
        if (err) { return res.serverError(err); }

        if (user) {
          Entity.create({
            email: req.param('email'),
            password: req.param('password'),
            user: user
          }).exec(function(err, entity) {
            if (err) { return res.serverError(err); }

            User.update({id: user.id}, {
              entity: entity
            }).exec(function(err, updatedUser) {
              if (err) { return res.serverError(err); }

              Log.create({
                description: 'A new user has been created : ' + entity.email
              }).exec(function(err, log) {
                if (err) { return res.serverError(err); }

                return res.created(entity);
              });
            });
          });
        } else {
          return res.serverError('The user could not be created');
        }
      });
    } else if (req.param('type') == 'society') {
      Society.create({
        legalname: req.param('legalname'),
        address: req.param('address'),
        siretNumber: req.param('siretNumber')
      }).exec(function(err, society) {
        if (err) { return res.serverError(err); }

        if (society) {
          Entity.create({
            email: req.param('email'),
            password: req.param('password'),
            society: society
          }).exec(function(err, entity) {
            if (err) { return res.serverError(err); }

            Society.update({id: society.id}, {
              entity: entity
            }).exec(function(err, updatedSociety) {
              if (err) { return res.serverError(err); }

              Log.create({
                description: 'A new society has been created : ' + entity.email
              }).exec(function(err, log) {
                if (err) { return res.serverError(err); }

                return res.created(entity);
              });
            });
          });
        } else {
          return res.serverError('The society could not be created');
        }
      });
    } else {
      return res.serverError('No type was provided');
    }
  }
};
