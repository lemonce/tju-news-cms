'use strict';

module.exports = function* getArticleListOfCategory(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const category = res.data();

	const articleList = yield Article.findAll({
		where: {
			category: category.id
		}
	});

	res.data(articleList);

	next();
};