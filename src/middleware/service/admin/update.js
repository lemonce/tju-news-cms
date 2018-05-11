'use strict';

module.exports = function* updateAdmin(req, res, next) {
	const admin = res.data();

	yield admin.update(req.body);

	next();
};