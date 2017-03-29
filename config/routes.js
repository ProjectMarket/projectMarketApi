/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'POST /signup': 'AuthController.signup',
  'POST /signin': 'AuthController.signin',
  'POST /project/create': 'ProjectController.createProject',
  'POST /applyToProject/:projectId': 'ProjectController.applyToProject',
  'POST /unapplyFromProject/:projectId': 'ProjectController.removeAppliance',
  'POST /selectMoeForProject/:projectId': 'ProjectController.selectMoeForProject',
  'POST /endProject/:projectId': 'ProjectController.endProject',
  'POST /project/:projectId/addDocument': 'ProjectController.addDocument',
  'POST /markedAsRead': 'MessageController.markAsRead',
  'POST /markedAsNotRead': 'MessageController.markAsNotRead',
  'POST /sendMessage': 'MessageController.sendMessage',
  'POST /deleteMessages': 'MessageController.deleteMessages',
  'PUT /updateProfile/:entityId': 'EntityController.updateProfile',
  'PUT /updatePassword/:entityId': 'EntityController.updatePassword',
  'GET /project/:projectId': 'ProjectController.getProject',
  'GET /entity/me': 'EntityController.me',
  'GET /entity/:entityId': 'EntityController.getEntity',
  'GET /categories': 'CategoryController.getCategories',
  'GET /skills': 'SkillController.getSkills',
  'GET /messages/:entityId': 'MessageController.getMessages',
  'DELETE /entity/:entityId': 'EntityController.deleteEntity'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
