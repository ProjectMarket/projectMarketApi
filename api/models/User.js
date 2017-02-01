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
    avatar: {
      type: 'string',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    postalcode: {
      type: 'string',
      required: false
    },
    city: {
      type: 'string',
      required: false
    },
    country: {
      type: 'string',
      required: false
    },
    administrator: {
      type: 'boolean',
      required: false,
      defaultsTo: false
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
    }
  },
  beforeCreate: function(value, next) {
    value.admin = false;
    return next();
  }
};
