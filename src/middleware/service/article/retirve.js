'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticle(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const Classification = res.sequelize.model('tjuClassification');
	
	const article = yield Article.findOne({
		where: {
			id: req.params.articleId
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	const classificationList = yield Classification.findAll({
		where: {
			articleId: article.id
		}
	});

	article.catagoryList = classificationList;

	res.data(article);

	next();
};