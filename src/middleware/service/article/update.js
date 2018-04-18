'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateArticle(req, res, next) {
	const article = res.data();

	if (article.published) {
		throwError('The article is published', 403);
	}

	const newArticle = yield article.update(req.body);

	res.data(newArticle);
	
	next();
};