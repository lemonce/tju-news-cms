'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteClassification(req, res, next) {
	const Classification = res.sequelize.model('tjuClassification');
	
	const classification = yield Classification.findOne({
		where: req.params
	});

	if (!classification) {
		throwError('The classification is not existed', 404);
	}

	yield classification.destroy();

	res.data(classification);

	next();
};