(function (module) {
	'use strict';

	const restify = require('restify'),
		utils = require('./utils');

	module.exports = (appAuthSecret, server, modelName, models, logger) => (req, res) => {
		if (req.body) {
			[
				require('./get-tenant')(appAuthSecret), 
				require('./services/create-model')(server, modelName, models)
			].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body]))
				.then((result) => utils.resolveSuccess(res, result))
				.catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger));
		} else {
			utils.resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
		}
	}
}(module));