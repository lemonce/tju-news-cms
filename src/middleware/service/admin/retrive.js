'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdmin(req, res, next) {
	const Administrator = res.sequelize.model('account');

	const admin = yield Administrator.findOne({
		where: {
			id: req.params.administratorId
		}
	});

	if (!admin) {
		throwError('Administrator is not existed', 404);
	}

	res.data(admin);

	next();
};