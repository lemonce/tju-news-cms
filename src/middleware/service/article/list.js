'use strict';

const Sequelize = require('sequelize');

module.exports = function* getArticleList(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const Alias = res.sequelize.model('tjuAlias');
	// const author = req.session.accountId;

	const {keyword, alias} = req.query;

	const state = alias === 'true' ? true : false;

	const query = {
		order: [['created_at', 'desc']]
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	let articleList;

	if (state) {
		query.model = Article;

		articleList = yield Alias.findAll({
			include: [query]
		});
	} else {
		query.include = [{
			model: Alias
		}];

		const allArticle = yield Article.findAll(query);

		articleList = allArticle.filter(article => {
			return article.tjuAliases.length === 0;
		});
	}

	res.data(articleList);

	next();
};