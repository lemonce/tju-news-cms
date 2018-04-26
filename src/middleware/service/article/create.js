'use strict';

const getAbstract = require('./utils/abstract');
const getThumbnail = require('./utils/thumbnail');

module.exports = function* createArticle(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const {abstract, alias} = req.body;

	if (req.body.abstract === '') {

	}

	const construction = Object.assign({}, req.body, { author: req.session.accountId });

	const article = yield Article.create(construction);

	res.data(article);

	next();
};