'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getCatagoryListUsable(req, res, next) {
	const Catagory = res.sequelize.model('tjuCatagory');

	const catagoryList = yield Catagory.findAll({
		where: {
			name: {
				[Sequelize.Op.like] : `%${req.query.name}%`
			},
			usability: 1
		}
	});

	if (catagoryList.length === 0) {
		throwError('The catagory is not existed', 404);
	}

	res.data(catagoryList);

	next();
};