'use strict';

const {
	$testQuery,
	$testBody
} = require('express-handler-loader')('all');

const {
	deleteAdmin,
	getAdminiList,
	getAdmin,
	createArticle,
	getArticleList,
	getArticleForAuthor,
	getArticle,
	updateArticle,
	getArticleContentByService,
	deleteArticle,
	createCatagory,
	getCatagoryList,
	getCatagory,
	updateCatagory,
	beforeCreateClassification,
	createClassification,
	deleteClassification
} = require('express-handler-loader')('tju');

const router = module.exports = require('express').Router();

router.get('/administrator', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getAdminiList);

router.delete('/administrator/:administratorId', getAdmin, deleteAdmin);

router.post('/article', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumbnail: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['title', 'content', 'abstract', 'thumbnail']
}), createArticle);

router.get('/article', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		}
	}
}), getArticleList);

router.get('/article/:articleId', getArticle, getArticleForAuthor);//详细信息包括分类

router.put('/article/:articleId', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumbnail: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getArticle, updateArticle);

router.get('/article/:articleId/content', getArticle, getArticleContentByService);

router.delete('/article/:articleId', getArticle, deleteArticle);

router.post('/catagory', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		active: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['name']
}), createCatagory);

router.get('/catagory', $testQuery({
	properties: {
		name: {
			type: 'string'
		},
		active: {
			type: 'string',
			pattern: '^(true|false)$'
		}	
	},
	additionalProperties: false
}), getCatagoryList);

router.get('/catagory/:catagoryId', getCatagory);

router.put('/catagory/:catagoryId', $testBody({ //只能由可用改为不可用
	properties: {
		active: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['active']
}), getCatagory, updateCatagory);

router.post('/article/:articleId/catagory/:catagoryId', getArticle, beforeCreateClassification, createClassification);

router.post('/article/:articleId/catagory', getArticle, createClassification);

router.delete('/article/:articleId/catagory/:catagoryId', getArticle, beforeCreateClassification, deleteClassification);