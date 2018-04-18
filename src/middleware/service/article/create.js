'use strict';

module.exports = function* createArticle(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');

	const construction = Object.assign({}, req.body, { author: req.session.accountId });

	const article = yield Article.create(construction);

	res.data(article);

	next();
};