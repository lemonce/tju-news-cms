'use strict';

module.exports = function uploadImage(req, res, next) {
	const imageBuffer = req.files.content.data;
	const {config} = require('lemonitor-service');
	const domain = config.get('server.domain');
	const port = config.get('server.protocol.http.port');

	const {imageRepository} = require('./repository');

	const entry = imageRepository.push(imageBuffer);
	const hash = entry.meta.hash;

	res.data({
		default: `http://${domain}:${port}/api/tju/image/${hash}/regular/common`
	});
	
	next();
};