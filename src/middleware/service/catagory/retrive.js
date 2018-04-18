'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getCatagory(req, res, next) {
	const Catagory = res.sequelize.model('tjuCatagory');

	const catagory = yield Catagory.findOne({
		where: {
			id: req.params.catagoryId
		}
	});

	if (!catagory) {
		throwError('The catagory is not existed.', 404);
	}

	res.data(catagory);

	next();
};