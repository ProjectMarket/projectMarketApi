/**
 * Configuration Passport
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES = 60 * 60 * 24;
var SECRET = "qldjkfbqlskjfdbqksjhdbfjgzjgyevyutcivbe";
var ALGO = "HS256";
var ISSUER = 'test.com';
var AUDIENCE = 'test.com';

/**
 * Config strategy local
 */

var LOCAL_STRATEGY_CONFIG = {
  usernameField : 'email',
  passwordField : 'password'
};

/**
 * Config strategy jwt
 */

var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey : SECRET,
  issuer : ISSUER,
  audience : AUDIENCE
};

/**
 * function for handling login via login + password
 * @param login
 * @param password
 * @param next
 */

function onLocalStrategyAuth(email, password, next) {
    Entity.findOne({
        email: email
    }).exec(function(error, entity) {
      if (error) {
        return next(error, false, {
          code: 'E_NO_DATABASE_CONNECTION',
          message: 'connection à la base de données impossible'
        });
      }
      if (!entity) {
        return next(null, false, {
          code: 'E_USER_NOT_FOUND',
          message: 'email or password is wrong'
        });
      }
      if (!SecurityService.comparePassword(password, entity)) {
        return next(null, false, {
          code: 'E_USER_PASSWORD_MISMATCH',
          message: 'email or password is wrong'
        });
      }
      Log.create({
        description: 'An entity has connected : ' + entity.email
      }).exec(function(err, log){
        if (err) {
          return next(null, false, {
            code: 'E_LOG_PROBLEM',
            message: 'Could not create log entry'
          });
        }
      });

      var obj = entity.toJSON();

      if (obj.type == 'user') {
        User.findOne({
          id: obj.elementId
        }).exec(function(err, user) {
          if (!err && user) {
            obj.associatedElement = user.toJSON();
            delete obj.elementId;
            return next(null,obj,{});
          }
        });
      } else if (obj.type == 'society') {
        Society.findOne({
          id: obj.elementId
        }).exec(function(err, society) {
          if (!err && society) {
            obj.associatedElement = society.toJSON();
            delete obj.elementId;
            return next(null,obj,{});
          }
        });
      }
    });
}

/**
 * function for handling login via json web token
 * @param payload
 * @param next
 * @returns {*}
 */

function onJwtStrategyAuth(payload, next) {
  var entity = payload.entity;
  Log.create({
    description: 'An entity has connected : ' + entity.email
  }).exec(function(err, log){
    if (err) {
      return next(null, false, {
        code: 'E_LOG_PROBLEM',
        message: 'Could not create log entry'
      });
    }
  });
  return next(null,entity,{});
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, onLocalStrategyAuth));

passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, onJwtStrategyAuth));

module.exports.jwtSettings = {
  expires: EXPIRES,
  secret: SECRET,
  algo: ALGO,
  issuer: ISSUER,
  audience: AUDIENCE
};

module.exports.orm = {
  _hookTimeout: 60000
};

module.exports.pubsub = {
  _hookTimeout: 60000
};
