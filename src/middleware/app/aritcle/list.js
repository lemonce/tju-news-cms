'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getArticleListPublished(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');

	const { keyword } = req.query;

	const query = {
		where: {
			published: true
		},
		order: [['created_at', 'desc']]
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	const articleList = yield Article.findAll(query);

	if (articleList.length === 0) {
		throwError('The article is not existed', 404);
	}

	res.data(articleList);

	next();
};