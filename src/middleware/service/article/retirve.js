'use strict';

module.exports = function* getArticleForAuthor(req, res, next) {
	const article = res.data();
	const _ = require('lodash');
	const Classification = res.sequelize.model('tjuClassification');

	const classificationList = yield Classification.findAll({
		where: {
			articleId: article.id
		}
	});

	const mixedArticle = _.pick(article, [
		'id', 'title', 'content', 'abstract', 'thumbnail', 'author'
	]);

	mixedArticle.classification = [];

	classificationList.forEach(element => {
		mixedArticle.classification.push(element.catagoryId);
	});

	res.data(mixedArticle);

	next();
};