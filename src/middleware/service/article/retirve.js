'use strict';

module.exports = function getArticleForAuthor(req, res, next) {
	const article = res.data();
	const _ = require('lodash');

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'abstract', 'thumbnail', 'author', 'category'
	]);

	res.data(mixedArticle);

	next();
};