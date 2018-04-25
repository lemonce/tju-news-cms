'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateCatagory(req, res, next) {
	const catagory = res.data();

	// if (!catagory.active) {
	// 	throwError('The catagroy has disabled.', 403);
	// }

	const newCatagory = yield catagory.update(req.body);

	res.data(newCatagory);

	next();
};