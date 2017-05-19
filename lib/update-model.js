(function (module) {
    'use strict';

    const restify = require('restify'),
        utils = require('./utils');

    module.exports = (appAuthSecret, server, modelName, models, logger) => (req, res) => {
        if (req.body && req.body.id) {
            [
                require('./get-tenant')(appAuthSecret),
                require('./services/get-model-by-id')(server, modelName, models),
                require('./services/update-model'),
                require('./services/update-model-included')
            ].reduce((chain, task) => chain.then(task), Promise.resolve([req.params.jwt, req.body.id, req.body]))
                .then((result) => utils.resolveSuccess(res, result))
                .catch((err) => utils.resolveError(res, new restify.InternalServerError(err.message), logger));
        } else {
            res.send(new restify.BadRequestError('Invalid Request Body'));
        }
    }
}(module));