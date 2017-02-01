/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getCategories: function(req, res) {
		Category.find().exec(function(err, categories) {
			if (err) { return res.serverError(err); }
			if (!categories) { return res.serverError('No categories found'); }

			return res.ok(categories);
		});
	}
};
