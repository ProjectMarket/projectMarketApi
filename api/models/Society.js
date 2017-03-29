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
    siretnumber: {
      type: 'string',
      required: true,
      size: 14
    },
    avatar: {
      type: 'string',
      required: false
    },
    entity: {
      model: 'entity',
      required: false
    },
    skills: {
      collection: 'skill',
      via: 'societies',
      dominant: true,
      required: false
    }
  }
};
