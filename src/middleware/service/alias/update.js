'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateAlias(req, res, next) {
	const article = res.data();
	const {alias} = req.body;
	const Alias = res.sequelize.model('tjuAlias');

	const articleAlias = yield Alias.findOne({
		where: {
			article: article.id
		}
	});

	const existedAlias = yield Alias.findOne({
		where: {
			alias
		}
	});

	
	if (articleAlias) {

		if (articleAlias.alias !== alias && existedAlias) {
	
			throwError('The alias is existed.', 403);
		}

		yield articleAlias.update({
			alias
		});

	}

	if (!articleAlias && alias !== null && alias !== '') {
		yield Alias.create({
			alias,
			article: article.id
		});
	}

	next();
	
};