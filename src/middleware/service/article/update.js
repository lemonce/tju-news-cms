'use strict';

module.exports = function* updateArticle(req, res, next) {
	const article = res.data();

	const newArticle = yield article.update(req.body);

	res.data(newArticle);
	
	next();
};