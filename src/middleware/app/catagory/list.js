'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getCatagoryListUsable(req, res, next) {
	const Catagory = res.sequelize.model('tjuCatagory');
	const { name } = req.query;
	
	const query = {
		where: {
			active: true
		}
	};

	name ? query.where.name = { [Sequelize.Op.like]: `%${name}%`} : undefined;

	const catagoryList = yield Catagory.findAll(query);

	if (catagoryList.length === 0) {
		throwError('The catagory is not existed', 404);
	}

	res.data(catagoryList);

	next();
};