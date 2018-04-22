'use strict';

module.exports = function getArticleContentByService(req, res, next) {
	const article = res.data();
	
	res.data(article.content);

	next();
};