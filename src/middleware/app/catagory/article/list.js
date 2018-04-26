'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticleListOfCategory(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const category = res.data();

	const articleList = yield Article.findAll({
		where: {
			category: category.id
		}
	});

	if (articleList.length === 0) {
		throwError('The article is not existed', 404);
	}

	res.data(articleList);

	next();
};