'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getArticleList(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const author = req.session.accountId;

	const {keyword, published} = req.query;

	const query = {
		where: {
			author
		},
		order: [['created_at', 'desc']]
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	published ? (query.where.published = (published === 'true' ? true : false)) : undefined;

	const articleList = yield Article.findAll(query);

	if (articleList.length === 0) {
		throwError('The article is not existed', 404);
	}

	res.data(articleList);

	next();
};