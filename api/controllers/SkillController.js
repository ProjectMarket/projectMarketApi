/**
 * SkillController
 *
 * @description :: Server-side logic for managing skills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getSkills: function(req, res) {
		Skill.find().populate('category').exec(function(err, skills) {
			if (err) { return res.serverError(err); }
			if (!skills) { return res.serverError('No skills found'); }

			return res.ok(skills);
		});
	}
};
