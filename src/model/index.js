'use strict';

const lemonitor = require('lemonitor-service');

const Account = lemonitor.sequelize.model('account');
const { Article, ArticleAlias} = require('./article');

Article.belongsTo(Account, {
	foreignKey: 'author'
});

Account.hasMany(Article, {
	foreignKey: 'author'
});

ArticleAlias.belongsTo(Article, {
	foreignKey: 'articleId'
});

Article.hasMany(ArticleAlias, {
	foreignKey: 'articleId'
});
