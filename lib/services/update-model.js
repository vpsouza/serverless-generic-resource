(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance'),
        modelUtils = require('../model-utils');

    module.exports = ([modelBody, instance, ...opt] = data) => instance ?
        instance.update(modelBody).then((result) => Promise.resolve([modelBody, result, ...opt])) :
        Promise.reject({
            'msg': 'Record not found'
        });

}(module));