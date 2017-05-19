(function (module) {
    'use strict';

    module.exports = ([modelInstance, ...opt] = data) =>
        instance ?
        instance.destroy().then(result => Promise.resolve([result, ...opt])) :
        Promise.reject({
            'msg': modelName + ' record not found'
        })
}(module));