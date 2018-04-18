'use strict';

module.exports = function getArticleContent(req, res, next) {
	const article = res.data();
	
	res.data(article.content);

	next();
};