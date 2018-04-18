'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteArticle(req, res, next) {
	const article = res.data();

	if (article.published) {
		throwError('The article is published', 403);
	}

	yield article.destroy();

	next();
};