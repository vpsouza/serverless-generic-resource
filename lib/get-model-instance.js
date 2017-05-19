(function(module){
    'use strict';
    
    module.exports = (models, modelName) => models[modelName.charAt(0).toUpperCase() + modelName.slice(1)];
}(module));