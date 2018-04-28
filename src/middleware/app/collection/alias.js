'use strict';

module.exports = function getArticleListByAlias(aliasParam, Article, Alias) {

	if (typeof aliasParam !== 'string') {
		throw new Error('The parameter should be a string.');
	}

	return new Promise((resolve) => {

		Alias.findOne({
			where: {
				alias: aliasParam
			},
			attributes: ['id', 'title', 'abstract', 'thumbnail', 'created_at']
		}).then(alias => {
			
			if (alias) {
				
				Article.findOne({
					where: {
						id: alias.article
					}
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