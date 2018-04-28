'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAlias(req, res, next) {
	const article = res.data();
	const {alias} = req.body;
	const Alias = res.sequelize.model('tjuAlias');

	if (alias && alias !== '') {

		const existedAlias = yield Alias.findOne({
			where: {
				alias
			}
		});
	
		if (existedAlias) {
			throwError('The alias has existed.', 403);
		}
	
		yield Alias.create({
			alias,
			article: article.id
		});
	
	}
	
	next();
};