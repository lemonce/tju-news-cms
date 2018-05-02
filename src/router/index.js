'use strict';

const {
	isAccountSignedIn
} = require('express-handler-loader')('all');

const {
	getImage,
	getThumbnail
} = require('express-handler-loader')('tju');

const router = module.exports = require('express').Router();

const appRouter = require('./app');
const serviceRouter = require('./service');

router.use('/app', appRouter);

router.use('/service', isAccountSignedIn, serviceRouter);

router.get('/image/:hash/regular/:regularName', getImage);

router.get('/thumbnail/:hash/regular/:regularName', getThumbnail);