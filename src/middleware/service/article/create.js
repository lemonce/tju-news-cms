'use strict';

const getAbstract = require('./utils/abstract');
const getThumbnail = require('./utils/thumbnail');

module.exports = function* createArticle(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const {abstract, content, title, category, created_at} = req.body;

	if (abstract === '' || abstract === null) {
		req.body.abstract = getAbstract(content);
	}

	const thumbnail = yield getThumbnail(content);

	const construction = Object.assign({}, {
		abstract: req.body.abstract,
		content,
		title,
		category,
		created_at
	}, { author: req.session.accountId }, {thumbnail});

	const article = yield Article.create(construction);

	res.data(article);

	next();
};