'use strict';

module.exports = function uploadImage(req, res, next) {
	const imageBuffer = req.files.content.data;

	const imageRepository = require('./repository');

	const common = {
		type: 'png',
		chain: [
			{
				type: 'resize',
				args: [400, 300]
			},
			{
				type: 'max',
				args: []
			}
		]
	};

	imageRepository.createProfile('common', common);

	const entry = imageRepository.push(imageBuffer);
	const hash = entry.meta.hash;

	res.data({
		default: `http://localhost:80/api/tju/service/image/${hash}/regular/common`
	});
	
	next();
};