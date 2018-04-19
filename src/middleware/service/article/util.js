'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticle(req, res, next) {
	const Article = res.sequelize.model('tjuArticle');
	const author = req.session.accountId;
	
	const article = yield Article.findOne({
		where: {
			id: req.params.articleId,
			author
		}
	});

	if (!article) {
		throwError('The article is not existed.', 404);
	}

	res.data(article);

	next();
};