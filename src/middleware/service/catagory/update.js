'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateCategory(req, res, next) {
	const category = res.data();

	// if (!category.active) {
	// 	throwError('The catagroy has disabled.', 403);
	// }

	const newCategory = yield category.update(req.body);

	res.data(newCategory);

	next();
};