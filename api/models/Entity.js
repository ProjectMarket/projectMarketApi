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
