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
    siretNumber: {
      type: 'string',
      required: true,
      size: 14
    },
    entity: {
      model: 'entity',
      required: false
    }
  }
};
