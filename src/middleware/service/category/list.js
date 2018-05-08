'use strict';

const Sequelize = require('sequelize');

module.exports = function* getCategoryList(req, res, next) {
	const Category = res.sequelize.model('tjuCategory');
	const { name, active } = req.query;
	
	const query = {
		where: {}
	};

	name ? query.where.name = { [Sequelize.Op.like]: `%${name}%`} : undefined;
	active ? query.where.active = (active === 'true' ? true : false) : undefined;

	const categoryList = yield Category.findAll(query);

	res.data(categoryList);

	next();
};