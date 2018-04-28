'use strict';

module.exports = function* getArticleForAuthor(req, res, next) {
	const article = res.data();
	const _ = require('lodash');
	const Alias = res.sequelize.model('tjuAlias');

	const articleAlias = yield Alias.findOne({
		where: {
			article: article.id
		}
	});

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'abstract', 'thumbnail', 'author', 'category'
	]);

	if (articleAlias) {

		mixedArticle.alias = articleAlias.alias;
	}

	res.data(mixedArticle);

	next();
};