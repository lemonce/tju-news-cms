'use strict';

const Sequelize = require('sequelize');

module.exports = function* getArticleList(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const author = req.session.accountId;

	const {keyword} = req.query;

	const query = {
		where: {
			author
		},
		order: [['created_at', 'desc']]
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	const articleList = yield Article.findAll(query);

	res.data(articleList);

	next();
};