'use strict';

const {
	isAccountSignedIn,
	$testQuery,
	$testBody
} = require('express-handler-loader')('all');

const {
	deleteAdmin,
	getAdminiList,
	getAdmin,
	createArticle,
	getArticleList,
	getArticle,
	updateArticle,
	deleteArticle,
	createCatagory,
	getCatagoryList,
	getCatagory,
	updateCatagory,
	createClassification,
	deleteClassification
} = require('express-handler-loader')('tju');

const router = module.exports = require('express').Router();

router.get('/administrator', $testQuery({
	properties: {

	}
}), getAdminiList);

router.delete('/administrator/:administratorId', getAdmin, deleteAdmin);

router.post('/article', $testBody({
	properties: {

	}
}), createArticle);

router.get('/article', $testQuery({
	properties: {

	}
}), getArticleList);

router.get('/article/:articleId', getArticle);//详细信息包括分类

router.put('/article/:articleId', $testBody({
	properties: {

	}
}), getArticle, updateArticle);

router.delete('/article/:articleId', getArticle, deleteArticle);

router.post('/catagory', $testBody({
	properties: {

	}
}), createCatagory);

router.get('/catagory', $testQuery({

}), getCatagoryList);

router.get('/catagory/:catagoryId', getCatagory);

router.put('/catagory/:catagoryId', $testBody({
	properties: {

	}
}), getCatagory, updateCatagory);

router.post('/article/:articleId/catagory/:catagoryId', getArticle, getCatagory, createClassification);

router.delete('/article/:articleId/catagory/:catagoryId', deleteClassification);