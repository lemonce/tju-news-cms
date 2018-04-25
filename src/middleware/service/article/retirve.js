'use strict';

module.exports = function* getArticleForAuthor(req, res, next) {
	const article = res.data();
	const _ = require('lodash');
	const Classification = res.sequelize.model('tjuClassification');

	const classification = yield Classification.findOne({
		where: {
			articleId: article.id
		}
	});

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'abstract', 'thumbnail', 'author'
	]);

	if (classification) {
		mixedArticle.catagory = classification.catagoryId;
	}

	res.data(mixedArticle);

	next();
};