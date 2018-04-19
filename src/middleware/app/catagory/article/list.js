'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getArticleListOfCatagory(req, res, next) {
	const Classification = res.sequelize.model('tjuClassification');
	const Article = res.sequelize.model('tjuArticle');
	const catagory = res.data();
	
	const classificationList = yield Classification.findAll({
		where: {
			catagoryId: catagory.id
		},
		include: [{
			model: Article,
			where: {
				published: true
			}
		}]
	});

	if (classificationList.length === 0) {
		throwError('The article is not existed', 404);
	}

	res.data(classificationList);

	next();
};