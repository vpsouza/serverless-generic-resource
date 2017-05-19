(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance'),
        modelUtils = require('../model-utils');

    module.exports = (server, modelName, models) => ([tenantID, modelBody] = data) => {
        let sequelizeModelInstance = getModelInstance(models(server, tenantID), modelName);
        return sequelizeModelInstance.create(modelBody, {
            include: modelUtils.getIncludedModels(modelBody, sequelizeModelInstance)
        });
    }
}(module));