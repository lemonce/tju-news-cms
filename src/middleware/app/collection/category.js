'use strict';

const _ = require('lodash');

module.exports = function getArticleListByCategory(categoryParam, Article, Category) {

	if (typeof categoryParam !== 'object') {
		throw new Error('The parameter should be an object.');
	}

	const {thumbnail, exp} = categoryParam;
	let limit;

	if (exp) {

		if (exp.limit && typeof exp.limit !== 'number') {
			
			throw new Error('The limit should be a number.');
		}

		limit = exp.limit;
	}

	return getArticleList(categoryParam.name, Article, Category, limit).then(articleList => {
		
		let newArticleList;

		if (thumbnail || thumbnail === undefined) {

			newArticleList = articleList.filter(article => {
				return article.thumbnail;
			});

		} else {
			newArticleList = articleList;
		}

		if (exp) {
			const {operation, range} = exp;

			if (operationObj[operation] && range) {
				newArticleList = operationObj[operation](range, newArticleList);
			}
		}

		return newArticleList;

	});
};

function getArticleListByRange({from = 0, to}, list) {

	if (!to) {
		to = list.length;
	}

	if (from > to) {
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

function getArticleList(categoryName, Article, Category, limit) {

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
					attributes: ['id', 'title', 'abstract', 'thumbnail', 'created_at']
				};
				
				if (limit) {
					query.limit = limit + 1;
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