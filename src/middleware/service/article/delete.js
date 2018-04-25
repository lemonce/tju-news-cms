'use strict';

module.exports = function* deleteArticle(req, res, next) {
	const article = res.data();

	yield article.destroy();

	next();
};