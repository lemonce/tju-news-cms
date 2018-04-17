'use strict';

const {
	$testQuery
} = require('express-handler-loader')('all');

const {
	getAricleListPublished,
	getAriclePublished,
	getArticleContent,
	getAricleListOfCatagory,
	getCatagoryListUsable,
	getCatagoryUsable
} = require('express-handler-loader')('tju');

const router = module.exports = require('express').Router();

router.get('/article', $testQuery({
	properties: {

	}
}), getAricleListPublished);

router.get('/article/:articleId', getAriclePublished);

router.get('/article/:articleId/content', getAriclePublished, getArticleContent);

router.get('/catagory', $testQuery({
	properties: {

	}
}), getCatagoryListUsable);

router.get('/catagory/:catagoryId/article', getCatagoryUsable, getAricleListOfCatagory);