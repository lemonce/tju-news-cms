'use strict';

module.exports = function uploadImage(req, res, next) {
	res.data({
		default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524653398324&di=f665dc12e3f0d5442c2c0dd850977244&imgtype=0&src=http%3A%2F%2Fimg15.3lian.com%2F2015%2Ff2%2F49%2Fd%2F115.jpg'
	});

	next();
};