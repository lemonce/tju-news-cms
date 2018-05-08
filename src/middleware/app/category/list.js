'use strict';

const Sequelize = require('sequelize');

module.exports = function* getCategoryListUsable(req, res, next) {
	const Category = res.sequelize.model('tjuCategory');
	const { name } = req.query;
	
	const query = {
		where: {
			active: true
		}
	};

	name ? query.where.name = { [Sequelize.Op.like]: `%${name}%`} : undefined;

	const categoryList = yield Category.findAll(query);

	res.data(categoryList);

	next();
};