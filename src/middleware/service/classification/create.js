'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('tjuClassification');
	const {articleId} = req.params;
	
	const classification = yield Classification.findOne({
		where: {
			articleId
		}
	});

	if (classification) {
		throwError('The classification of article has existed', 403);
	}

	const newClassification = yield Classification.create(req.params);

	res.data(newClassification);

	next();
};