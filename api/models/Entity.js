/**
 * Entity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    type: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    elementId: {
      type: 'integer',
      required: false
    },
    projectsApplied: {
      collection: 'project',
      via: 'appliants',
      required: false
    },
    avis: {
      collection: 'commentary',
      via: 'owner',
      required: false
    },
    getElement: function(elementId, type, cb) {
      if (type == 'user') {
        User.findOne({id: elementId}).exec(function(err, user) {
          if (!err && user) {
            cb(user);
          } else {
            cb({});
          }
        });
      } else if (type == 'society') {
        Society.findOne({id: elementId}).exec(function(err, society) {
          if (!err && society) {
            cb(society);
          } else {
            cb({});
          }
        });
      }
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(value, next) {
    SecurityService.hashPassword(value);
    return next();
  }
};
