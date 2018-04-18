'use strict';

const {
	$testQuery
} = require('express-handler-loader')('all');

const {
	getArticleListPublished,
	getArticlePublished,
	getArticleContent,
	getArticleListOfCatagory,
	getCatagoryListUsable,
	// getCatagoryUsable,
	getCatagory
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

router.get('/catagory', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	}
}), getCatagoryListUsable);

router.get('/catagory/:catagoryId/article', getCatagory, getArticleListOfCatagory);