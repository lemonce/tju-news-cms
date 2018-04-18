'use strict';

module.exports = function* deleteAdmin(req, res, next) {
	const admin = res.data();

	yield admin.destroy();

	next();
};