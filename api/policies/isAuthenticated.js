var passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function (error, entity, info) {
    if (error) return res.serverError(error);
    if (!entity) {
      return res.unauthorized(null, info && info.code, info && info.message);
    }
    req.entity = entity;
    next();
  }) (req, res);
};
