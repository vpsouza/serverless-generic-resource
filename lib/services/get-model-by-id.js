(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance'),
        modelUtils = require('../model-utils');
        
    module.exports = (server, modelName, models) => ([tenantID, id, ...opts] = data) => getModelInstance(models(server, tenantID), modelName).findById(id).then(resultInstance => Promise.resolve([resultInstance, ...opts]))
}(module));