'use strict';

const _ = require('lodash');

module.exports = function getArticleListByCategory(categoryParam, Article, Category) {

	if (typeof categoryParam !== 'object') {
		throw new Error('The parameter should be an object.');
	}

	const {thumbnail = true, exp} = categoryParam;
	let limit;

	if (exp) {

		if (exp.limit && typeof exp.limit !== 'number') {
			
			throw new Error('The limit should be a number.');
		}

		limit = exp.limit;
	}
	
	return getArticleList(categoryParam.name, Article, Category, limit, thumbnail).then(articleList => {
		
		if (exp) {
			const {operation, range} = exp;

			if (operationObj[operation] && range) {
				articleList = operationObj[operation](range, articleList);
			}
		}

		return articleList;

	});
};

function getArticleListByRange({from = 0, to}, list) {

	if (!to) {
		to = list.length;
	}

	if (from > to || typeof from !== 'number' ||  typeof to !== 'number') {
		throw new Error('The range is ignore.');
	}

	return list.slice(from, to);
}

const operationObj = {
	top(range, newArticleList) {

		return getArticleListByRange(range, newArticleList);
	},
	random(range, newArticleList) {

		const newList = _.shuffle(newArticleList);

		return getArticleListByRange(range, newList);
	}
};

function getArticleList(categoryName, Article, Category, limit, thumbnail) {

	const Sequelize = require('sequelize');

	return new Promise((resolve) => {
		Category.findOne({
			where: {
				name: categoryName
			}
		}).then(category => {

			if (category) {

				const query = {
					where: {
						category: category.id
					},
					attributes: ['id', 'title', 'abstract', 'thumbnail', 'created_at'],
					order: [['created_at', 'desc']]
				};
				
				if (limit) {
					query.limit = limit;
				}

				if (thumbnail) {
					
					query.where.thumbnail = {
						[Sequelize.Op.ne]: null
					};
				}
				
				Article.findAll(query).then(articleList => {
		
					resolve(articleList);
				});
			} else {
				resolve([]);
			}

		});
	});
}