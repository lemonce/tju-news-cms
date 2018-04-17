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

Classification.hasMany(Article, {
	foreignKey: 'articleId'
});

Classification.hasMany(Catagory, {
	foreignKey: 'catagoryId'
});

