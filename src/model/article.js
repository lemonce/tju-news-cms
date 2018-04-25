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
		type: Sequelize.STRING
	}
}, {
	paranoid: true
});

const Catagory = sequelize.define('tjuCatagory', {
	name: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: 1
	}
});

const Classification = sequelize.define('tjuClassification');

module.exports = { Article, Catagory, Classification };
