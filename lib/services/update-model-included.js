(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance'),
        modelUtils = require('../model-utils');

    module.exports = ([modelBody, modelInstance, ...opt] = data) => {
        let toBeUpdated = [];
        modelUtils.getIncludedModels(modelBody, modelInstance, true)
            .filter(elm => modelBody[elm.relName])
            .forEach(includedModel => {
                if(Array.isArray(modelBody[includedModel.relName])){
                    Array.prototype.push.apply(toBeUpdated, modelBody[includedModel.relName].map(function(elm){
                        return includedModel.target.build(elm);
                    }));
                } else {
                    toBeUpdated.push(includedModel.target.build(modelBody[includedModel.relName]));
                }
            });
        return Promise.all(toBeUpdated.map(elm => elm.save())).then(data => Promise.resolve([...opt, data]));
    }
}(module));