'use strict';

const {throwError} = require('error-standardize');
const getArticleListByAlias = require('./alias');
const getArticleListByCategory = require('./category');

module.exports = function* createCollection(req, res, next) {
	const args = req.body;
	const Article = res.sequelize.model('tjuArticle');
	const Category = res.sequelize.model('tjuCategory');
	const Alias = res.sequelize.model('tjuAlias');
	const collection = {};

	for (const keys in args) {
		const result = [];
		
		if (!Array.isArray(args[keys])) {
			throwError('The query parameters is ignore.', 403);
		}

		for(let i = 0; i < args[keys].length; i++) {
			const type = args[keys][i].type ;

			if (type === 'alias') {
				const aliasList =  yield getArticleListByAlias(args[keys][i].parameter, Article, Alias);

				if (aliasList.length === 0) {
					throwError('The article of this alias is not existed.', 404);
				}

				result.push(aliasList);
			}

			if (type === 'category') {
				const categoryList = yield getArticleListByCategory(args[keys][i].parameter, Article, Category);

				if (categoryList.length === 0) {
					throwError('The articleList of category is not existed.', 404);
				}

				result.push(...categoryList);
			}
		}

		collection[keys] = result;
	}

	res.data(collection);

	next();

};