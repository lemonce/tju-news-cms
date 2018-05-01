'use strict';

const path = require('path');
const {ImageRepository} = require('sharp-repo');
const {FileStoreAdapter} = require('sharp-repo/src/store/file');

const store = new FileStoreAdapter({
	root: path.resolve(__dirname, '../../../figureRepo')
});

module.exports = new ImageRepository(store);