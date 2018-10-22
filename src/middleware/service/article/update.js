'use strict';

const getAbstract = require('./utils/abstract');
const getThumbnail = require('./utils/thumbnail');

module.exports = function* updateArticle(req, res, next) {
	// const article = res.data();
	const Article = res.sequelize.model('tjuArticle');
	const {abstract, content} = req.body;

	if (!abstract || abstract === '' && content) {
		req.body.abstract = getAbstract(content);
	}

	if (content) {
		req.body.thumbnail = yield getThumbnail(content);
	}

	const newArticle = yield Article.update(req.body, {
		where: {
			id: req.params.articleId
		}
	});

	res.data(newArticle);
	
	next();
};