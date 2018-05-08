'use strict';

module.exports = function* getAdminiList(req, res, next) {
	const Administrator = res.sequelize.model('account');

	const adminList = yield Administrator.findAll({
		where: req.query
	});

	res.data(adminList);

	next();
};