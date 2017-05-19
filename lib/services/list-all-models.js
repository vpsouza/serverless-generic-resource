(function (module) {
    'use strict';
    const getModelInstance = require('../get-model-instance'),
        modelUtils = require('../model-utils');

    module.exports = (server, modelName, models) => ([tenantID, modelBody] = data) => {
        let modelInstance = getModelInstance(models(server, tenantID), modelName);
        return modelInstance.findAll(normalizeWhereClause(modelBody || null, modelInstance ));
    }

	function normalizeWhereClause(whereClauseParam, modelInstance){
		if(whereClauseParam){
			if(whereClauseParam['where']){
				return {
					where: whereClauseParam['where'],
					include: modelUtils.getIncludedModels(null, modelInstance)
				};
			} else {
				let whereClause = {
					"$or": []
				}
				for(let prop in modelInstance){
					let clause = {};
					clause[prop] = { "$like" : "%" + modelInstance[prop] + "%"};
					whereClause["$or"].push(clause);
				}
				return whereClause;
			}
		} else {
			return {
				include: modelUtils.getIncludedModels(null, modelInstance)
			};
		}
	}
}(module));