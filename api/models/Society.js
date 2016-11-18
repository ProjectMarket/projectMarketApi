/**
 * Society.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    legalname: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: false
    },
    admin: {
      model: 'user',
      required: true
    },
    members: {
      collection: 'user',
      via: 'societyMember',
      required: false
    }
  }
};
