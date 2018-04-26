'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Article = sequelize.define('tjuArticle', {
	title: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.TEXT
	},
	abstract: {
		type: Sequelize.TEXT
	},
	thumbnail: {
		type: Sequelize.TEXT
	},
	category: {
		type: Sequelize.INTEGER
	}
}, {
	paranoid: true
});

const ArticleAlias = sequelize.define('tjuAlias', {
	alias: {
		type: Sequelize.CHAR(16)
	}
});

const Category = sequelize.define('tjuCategory', {
	name: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: 1
	}
});

module.exports = { Article, Category, ArticleAlias};
