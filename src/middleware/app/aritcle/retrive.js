'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticlePublished(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');

	const article = yield Article.findOne({
		where: {
			id: req.params.articleId
		}
	});

	if (!article) {
		throwError('The article is not existed', 404);
	}

	res.data(article);

	next();
};