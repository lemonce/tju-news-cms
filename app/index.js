'use strict';

import './plugins';

import app from 'app';

import Home from 'app/component/Home.vue';
import AdminstratorList from './component/administrator/list.vue';
import CreateArticle from './component/article/create.vue';
import UpdateArticle from './component/article/update.vue';
import ArticleList from './component/article/list.vue';
import CatagoryList from './component/catagory/list.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';

app.menu.addGroup('tju.administrator', [
	{
		label: 'administrator.all',
		path: '/tju/administrator/all'
	}
]);

app.menu.addGroup('tju.article', [
	{
		label: 'article.all',
		path: '/tju/article/all'
	},
	{
		label: 'article.create',
		path: '/tju/article/publish'
	},
	{
		label: 'catagory.all',
		path: '/tju/catagory/all'
	}
]);

// app.menu.addGroup('tju.catagory', [
// 	{
// 		label: 'catagory.all',
// 		path: '/tju/catagory/all'
// 	},
// 	{
// 		label: 'catagory.create',
// 		path: '/tju/catagory/publish'
// 	}
// ]);

app.router.addRoutes([
	{
		path: '/tju/administrator',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'all',
				component: AdminstratorList
			}
		]
	}
]);

app.router.addRoutes([
	{
		path: '/tju/article',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'all',
				component: ArticleList
			},
			{
				path: 'publish',
				component: CreateArticle
			},
			{
				path: ':id/update',
				component: UpdateArticle
			}
		]
	}
]);

app.router.addRoutes([
	{
		path: '/tju/catagory',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'all',
				component: CatagoryList
			}
		]
	}
]);