'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createCategory(req, res, next) {
	const Category = res.sequelize.model('tjuCategory');
	const {name} = req.body;


	const categoryExisted = yield Category.findAll({
		where: {
			name
		}
	});

	if (categoryExisted.length !== 0) {
		throwError('The category has existed.', 403);
	}

	const category = yield Category.create(req.body);

	res.data(category);

	next();
};