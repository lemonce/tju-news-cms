'use strict';

const fileUpload = require('express-fileupload');

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
	createCategory,
	getCategoryList,
	getCategory,
	updateCategory,
	beforeCreateClassification,
	uploadImage,
	updateAlias,
	createAlias,
	getImage
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
		category: {
			type: ['number', 'null']
		},
		alias: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['title', 'content']
}), beforeCreateClassification, createArticle, createAlias);

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
			type: ['string', 'null']
		},
		category: {
			type: ['number', 'null']
		},
		alias: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getArticle, beforeCreateClassification, updateArticle, updateAlias);

router.get('/article/:articleId/content', getArticle, getArticleContentByService);

router.delete('/article/:articleId', getArticle, deleteArticle);

router.post('/category', $testBody({
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
}), createCategory);

router.get('/category', $testQuery({
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
}), getCategoryList);

router.get('/category/:categoryId', getCategory);

router.put('/category/:categoryId', $testBody({ //只能由可用改为不可用
	properties: {
		active: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['active']
}), getCategory, updateCategory);

router.use(fileUpload());

router.post('/image', uploadImage);

router.get('/image/:hash/regular/:regularName', getImage);