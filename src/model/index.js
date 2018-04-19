'use strict';

const lemonitor = require('lemonitor-service');

const Account = lemonitor.sequelize.model('account');
const { Article, Catagory, Classification} = require('./article');

Article.belongsTo(Account, {
	foreignKey: 'author'
});

Account.hasMany(Article, {
	foreignKey: 'author'
});

Article.hasMany(Classification, {
	foreignKey: 'articleId'
});

Catagory.hasMany(Classification, {
	foreignKey: 'catagoryId'
});

Classification.belongsTo(Article, {
	foreignKey: 'articleId'
});

Classification.belongsTo(Catagory, {
	foreignKey: 'catagoryId'
});

