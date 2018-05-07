'use strict';

module.exports = function uploadImage(req, res, next) {
	const imageBuffer = req.files.content.data;

	const {imageRepository} = require('./repository');

	const entry = imageRepository.push(imageBuffer);
	const hash = entry.meta.hash;

	res.data({
		default: `/api/tju/image/${hash}/regular/common`
	});
	
	next();
};