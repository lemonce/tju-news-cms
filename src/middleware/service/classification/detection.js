'use strict';

const {throwError} = require('error-standardize');

module.exports = function* beforeCreateClassification(req, res, next) {
	const article = res.data();
	const Catagory = res.sequelize.model('tjuCatagory');

	const catagory = yield Catagory.findOne({
		where: {
			id: req.params.catagoryId,
			usability: 1
		}
	});

	if (!catagory) {
		throwError('The catagory is not existed.', 404);
	}

	if (article.published) {
		throwError('The article is published.', 403);
	}

	res.data({
		article, catagory
	});

	next();
};