(function (module) {
    'use strict';

    const restify = require('restify'),
        utils = require('./utils'),
        getModelInstance = require('./get-model-instance');

    module.exports = (appAuthSecret, server, modelName, models, logger) => (req, res) => {
        if (req.params && req.params.id) {
            [
                require('./get-tenant')(appAuthSecret), 
                require('./services/get-model-by-id')(server, modelName, models), 
                require('./services/delete-model')]
            .reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.params.id]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger));
        } else {
            utils.resolveError(res, new restify.BadRequestError('Invalid Request Body'), null);
        }
    }
}(module));