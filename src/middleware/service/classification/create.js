'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createClassification(req, res, next) {
	const Classification = res.sequelize.model('tjuClassification');
	
	const classification = yield Classification.findOne({
		where: req.params
	});

	if (classification) {
		throwError('The classification has existed');
	}

	const newClassification = yield Classification.create(req.params);

	res.data(newClassification);

	next();
};