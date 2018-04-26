'use strict';

const {
	$testQuery
} = require('express-handler-loader')('all');

const {
	getArticleListPublished,
	getArticlePublished,
	getArticleContent,
	getArticleListOfCategory,
	getCategoryListUsable,
	getCategory
} = require('express-handler-loader')('tju');

const router = module.exports = require('express').Router();

router.get('/article', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getArticleListPublished);

router.get('/article/:articleId', getArticlePublished);

router.get('/article/:articleId/content', getArticlePublished, getArticleContent);

router.get('/category', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	}
}), getCategoryListUsable);

router.get('/category/:categoryId/article', getCategory, getArticleListOfCategory);