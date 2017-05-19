(function(module){
    'use strict';
    
    const   restify = require('restify'),
            utils = require('./utils');

    module.exports = (appAuthSecret, server, modelName, models, logger) => (req, res) => {
		const getTenant = require('./get-tenant')(appAuthSecret);
        const listAllModels = require('./services/list-all-models')(server, modelName, models);

		[getTenant, listAllModels].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger ));
	}
}(module));