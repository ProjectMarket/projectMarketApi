/**
 * Service de comparaison du mdp et de création du token
 * Test commit
 */

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
  hashPassword : function(entity) {
    if (entity.password) {
      entity.password = bcrypt.hashSync(entity.password);
    }
  },
  comparePassword : function(password, entity) {
    return bcrypt.compareSync(password, entity.password);
  },
  createToken : function(entity) {
    return jwt.sign(
      {
        entity: entity
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: sails.config.jwtSettings.algo,
        expiresIn: sails.config.jwtSettings.expires,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience
      }
    );
  }

};
