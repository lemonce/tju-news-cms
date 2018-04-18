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
	getArticle,
	updateArticle,
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
		thumb: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false,
	required: ['title', 'content', 'abstract', 'thumb', 'published']
}), createArticle);

router.get('/article', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'	
		}
	}
}), getArticleList);

router.get('/article/:articleId', getArticle);//详细信息包括分类

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
		thumb: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false,
	required: ['published']
}), getArticle, updateArticle);

router.delete('/article/:articleId', getArticle, deleteArticle);

router.post('/catagory', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		usability: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false,
	required: ['name', 'description', 'usability']
}), createCatagory);

router.get('/catagory', $testQuery({
	properties: {
		name: {
			type: 'string'
		},
		usability: {
			type: 'string',
			pattern: '^(true|false)$'
		}	
	},
	additionalProperties: false
}), getCatagoryList);

router.get('/catagory/:catagoryId', getCatagory);

router.put('/catagory/:catagoryId', $testBody({ //只能由可用改为不可用
	properties: {
		usability: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false,
	required: ['usability']
}), getCatagory, updateCatagory);

router.post('/article/:articleId/catagory/:catagoryId', getArticle, beforeCreateClassification, createClassification);

router.delete('/article/:articleId/catagory/:catagoryId', getArticle, beforeCreateClassification, deleteClassification);