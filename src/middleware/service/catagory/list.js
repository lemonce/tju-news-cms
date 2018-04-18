'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getCatagoryList(req, res, next) {
	const Catagory = res.sequelize.model('tjuCatagory');
	const { name, usability } = req.query;

	const catagoryList = yield Catagory.findAll({
		where: {
			name: {
				[Sequelize.Op.like]: `%${name}%`
			},
			usability: usability === 'false' ? 0 : 1
		}
	});

	if (catagoryList.length === 0) {
		throwError('The catagory is not existed', 404);
	}

	res.data(catagoryList);

	next();
};