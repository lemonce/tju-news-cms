'use strict';

const {throwError} = require('error-standardize');

module.exports = function* beforeCreateClassification(req, res, next) {
	const Category = res.sequelize.model('tjuCategory');

	if (req.body.category) {

		const category = yield Category.findOne({
			where: {
				id: req.body.category,
				active: true
			}
		});
	
		if (!category) {
			throwError('The category is not existed.', 404);
		}
	}
	
	next();
};