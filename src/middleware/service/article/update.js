'use strict';

const getAbstract = require('./utils/abstract');
const getThumbnail = require('./utils/thumbnail');

module.exports = function* updateArticle(req, res, next) {
	const article = res.data();
	const {abstract, content} = req.body;

	if (!abstract || abstract === '' && content) {
		req.body.abstract = getAbstract(content);
	}

	if (content) {
		req.body.thumbnail = yield getThumbnail(content);
	}

	const newArticle = yield article.update(req.body);

	res.data(newArticle);
	
	next();
};