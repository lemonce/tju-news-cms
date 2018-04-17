'use strict';

const {
	isAccountSignedIn
} = require('express-handler-loader')('all');

const router = module.exports = require('express').Router();

const appRouter = require('./app');
const serviceRouter = require('./service');

router.use('/app', appRouter);

router.use('/service', serviceRouter);

router.use('/service', isAccountSignedIn);
