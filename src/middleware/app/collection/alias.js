'use strict';

module.exports = function getArticleListByAlias(aliasParam, Article, Alias) {

	if (typeof aliasParam.name !== 'string') {
		throw new Error('The parameter should be a string.');
	}

	return new Promise((resolve) => {

		Alias.findOne({
			where: {
				alias: aliasParam.name
			}
		}).then(alias => {
			
			if (alias) {
				
				Article.findOne({
					where: {
						id: alias.article
					},
					attributes: ['id', 'title', 'abstract', 'thumbnail', 'created_at']
				}).then(article => {
	
					if (article) {
	
						resolve(article);
					} else {
						resolve([]);
					}
				});

			} else {
				resolve([]);
			}

		});
	});
};