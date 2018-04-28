'use strict';

const {
	$testQuery,
	$testBody
} = require('express-handler-loader')('all');

const {
	getArticleListPublished,
	getArticlePublished,
	getArticleContent,
	getArticleListOfCategory,
	getCategoryListUsable,
	getCategory,
	createCollection
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

router.post('/article/collection', $testBody({
	patternProperties: {
		'^.*$': {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					type: {
						type: 'string'
					},
					parameter: {
						type: 'object',
						properties: {
							name: {
								type: 'string'
							},
							thumbnail: {
								type: 'boolean'
							},
							exp: {
								type: 'object',
								properties: {
									limit: {
										type: 'number'
									},
									range: {
										type: 'object',
										properties: {
											from: {
												type: 'number'
											},
											to: {
												type: 'string'
											}
										}
									},
									operation: {
										type: 'string'
									}
								},
								additionalProperties: false
							}
						},
						required: ['name'],
						additionalProperties: false
					}
				},
				required: ['type', 'parameter'],
				additionalProperties: false
			}
		}
	},
	additionalProperties: false
}), createCollection);