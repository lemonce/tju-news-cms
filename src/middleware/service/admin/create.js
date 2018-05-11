'use strict';

const { throwError } = require('error-standardize');

module.exports = function* createAdmin(req, res, next) {
	const Account = res.sequelize.model('account');
	const { name, password } = req.body;

	const account = yield Account.findOne({
		where: { name }
	});

	if (account) {
		throwError('Account has been existed. Try other names.', 403);
	}

	const newAccount = yield Account.create({
		name, password
	});

	Account.profile.create({
		accountId: newAccount.id
	});
	
	res.data(newAccount);
	
	next();
};