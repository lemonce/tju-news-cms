'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createCatagory(req, res, next) {
	const Catagory = res.sequelize.model('tjuCatagory');
	const {name} = req.body;

	const catagoryExisted = yield Catagory.findAll({
		where: {
			name
		}
	});

	if (catagoryExisted.length !== 0) {
		throwError('The catagory has existed.', 403);
	}

	const catagory = yield Catagory.create(req.body);

	res.data(catagory);

	next();
};