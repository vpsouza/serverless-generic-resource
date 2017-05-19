/**
 * Generate a generic C.R.U.D. api using restify and sequelize-multi-tenancy
 * @return {object}
 */
module.exports = (function() {
    'use strict';
    
      const validating = require('restify-sequelize-validation'),
            getModelById = require('./lib/get-model-by-id'),
            createModel = require('./lib/create-model'),
            updateModel = require('./lib/update-model'),
            listAllModels = require('./lib/list-all-models'),
            deleteModel = require('./lib/delete-model'),
            initDB = require('./lib/init-db');

        return {
            services: {
                initDb: require('./lib/services/init-db'),
				createModel: require('./lib/services/create-model'),
				deleteModel: require('./lib/services/delete-model'),
				getModelById: require('./lib/services/get-model-by-id'),
				listAllModels: require('./lib/services/list-all-models'),
				update: require('./lib/services/update-model')
            },
            resources: {
                getModelById: getModelById,
                listAllModels: listAllModels,
                createModel: createModel,
                updateModel: updateModel,
                deleteModel: deleteModel,
                initDB: initDB,
            },
            setupAPI: function(appAuthSecret, server, modelName, models, logger){
                server.get(modelName + '/:id',  getModelById(appAuthSecret, server, modelName, models, logger));
                server.put(modelName,           validating(server, modelName, models), createModel(appAuthSecret, server, modelName, models, logger));
                server.post(modelName,          validating(server, modelName, models), updateModel(appAuthSecret, server, modelName, models, logger));
                server.get(modelName,           listAllModels(appAuthSecret, server, modelName, models, logger));
                server.post(modelName,          listAllModels(appAuthSecret, server, modelName, models, logger));
                server.del(modelName + '/:id',  deleteModel(appAuthSecret, server, modelName, models, logger));
            }
        }
})();