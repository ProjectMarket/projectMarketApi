/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
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
    avatar: {
      type: 'string',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    societyAdmin: {
      model: 'society',
      required: false
    },
    societyMember: {
      model: 'society',
      required: false
    },
    entity: {
      model: 'entity',
      required: false
    },
    skills: {
      collection: 'skill',
      required: false
    },
    notifications: {
      collection: 'notification',
      via: 'receiver',
      required: false
    },
    messages: {
      collection: 'message',
      via: 'receiver',
      required: false
    },
    toJson: function() {
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
