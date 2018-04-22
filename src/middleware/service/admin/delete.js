'use strict';

module.exports = function* deleteAdmin(req, res, next) {
	const admin = res.data();
	const Profile = res.sequelize.model('accountProfile');

	yield Profile.destroy({
		where: {
			accountId: admin.id
		}
	});
	
	yield admin.destroy();

	next();
};