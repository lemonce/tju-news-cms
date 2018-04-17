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
	thumb: {
		type: Sequelize.STRING
	},
	published: {
		type: Sequelize.TINYINT,
		set(published) {

			if (published === true) {
				this.setDataValue('published', 1);
			} else {
				this.setDataValue('published', 0);
			}
		},
		get() {
			const published = this.getDataValue('published');

			if (published === 1) {
				return true;
			} else {
				return false;
			}
		}
	}
}, {
	paranoid: true
});

const Catagory = sequelize.define('tjuCatagory', {
	name: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	},
	usability: {
		type: Sequelize.TINYINT,
		set(usability) {

			if (usability === true) {
				this.setDataValue('usability', 1);
			} else {
				this.setDataValue('usability', 0);
			}
		},
		get() {
			const usability = this.getDataValue('usability');

			if (usability === 1) {
				return true;
			} else {
				return false;
			}
		}

	}
});

const Classification = sequelize.define('tjuClassification');

module.exports = { Article, Catagory, Classification };
