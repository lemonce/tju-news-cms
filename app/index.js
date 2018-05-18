'use strict';

import './plugins';

import app from 'app';

import Home from 'app/component/Home.vue';
import AdminstratorList from './component/administrator/list.vue';
import CreateArticle from './component/article/create.vue';
import UpdateArticle from './component/article/update.vue';
import ArticleList from './component/article/list.vue';
// import CategoryList from './component/category/list.vue';
import aliasList from './component/article/alias.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';

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
		label: 'article.alias.list',
		path: '/tju/article/alias'
	},
	{
		label: 'article.create',
		path: '/tju/article/publish'
	},
	// {
	// 	label: 'category.all',
	// 	path: '/tju/category/all'
	// }
]);

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
				path: 'alias',
				component: aliasList
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

// app.router.addRoutes([
// 	{
// 		path: '/tju/category',
// 		component: Home,
// 		meta: {
// 			requireAccount: true
// 		},
// 		children: [
// 			{
// 				path: 'all',
// 				component: CategoryList
// 			}
// 		]
// 	}
// ]);