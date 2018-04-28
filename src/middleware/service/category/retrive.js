'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getCategory(req, res, next) {
	const Category = res.sequelize.model('tjuCategory');

	const category = yield Category.findOne({
		where: {
			id: req.params.categoryId
		}
	});

	if (!category) {
		throwError('The category is not existed.', 404);
	}

	res.data(category);

	next();
};