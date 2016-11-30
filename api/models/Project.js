/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    moa: {
      model: 'entity',
      required: true
    },
    moe: {
      model: 'entity',
      required: false
    },
    appliants: {
      collection: 'entity',
      via: 'projectsApplied',
      dominant: true,
      required: false
    },
    budget: {
      type: 'float',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: false
    },
    category: {
      model: 'category',
      required: false
    },
    documents: {
      collection: 'document',
      via: 'project',
      required: false
    },
    commentaries: {
      collection: 'commentary',
      via: 'project',
      required: false
    }
  }
};
