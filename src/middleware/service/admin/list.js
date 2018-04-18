'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdminiList(req, res, next) {
	const Administrator = res.sequelize.model('account');

	const adminList = yield Administrator.findAll({
		where: req.query
	});

	if (adminList.length === 0) {
		throwError('Administrator is not existed', 404);
	}

	res.data(adminList);

	next();
};