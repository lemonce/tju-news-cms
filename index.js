'use strict';

const path = require('path');
const { appendEntry } = require('lemonitor-application');

require('./src/model');

require('express-handler-loader')('tju', {
	pathname: path.resolve(__dirname, './src/middleware')
});

const router = require('./src/router');

appendEntry('bundle', path.resolve(__dirname, './app'));

const service = require('lemonitor-service');

service.extend((app) => {
	app.use('/api/tju', router);
});