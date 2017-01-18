/**
 * Commentary.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    note: {
      type: 'integer',
      required: true
    },
    description: {
      type: 'text',
      required: true
    },
    owner: {
      model: 'entity',
      required: false
    },
    project: {
      model: 'project',
      required: true
    }
  }
};
