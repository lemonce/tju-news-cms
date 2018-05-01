'use strict';

const {throwError} = require('error-standardize');

module.exports = function getImage(req, res, next) {
	const {hash, regularName} = req.params;
	const imageRepository = require('./repository');

	res.set('Content-Type', 'image/png');

	imageRepository.read(hash, {
		regularName
	}).then(({data}) => {
		res.send(data);
	}).catch(err => {
		throwError('The image get is error.', 500);
	});

};