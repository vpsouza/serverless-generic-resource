(function (module) {
    'use strict';

    module.exports = (server, models, tenantID) => {
        // connect on database with public schema
        return models(server, null, true).sequelize.showAllSchemas()
            .then(result => {
                if (tenantID) {
                    let tenantDbInstance = models(server, tenantID, true).sequelize;
                    if (tenantID != 'public' && !result.includes(tenantID))
                        return tenantDbInstance
                            .createSchema(tenantID)
                            .then(resultCreate => doSyncDB(tenantDbInstance, tenantID))
                            .catch(errCreate => Promise.reject({
                                msg: 'Creation of the schema failure',
                                err: errCreate
                            }));
                    else
                        return doSyncDB(tenantDbInstance, tenantID);
                } else
                    return Promise.all(result.map((schemaName) => doSyncDB(models(server, schemaName, true).sequelize, schemaName, res)));
            })
            .catch(err => Promise.reject({
                msg: 'List of all availble schema failure',
                err: err
            }))
    }

    function doSyncDB(dbInstance, tenantID) {
        return dbInstance.sync({
                force: true
            }, {
                schema: tenantID
            })
            .then(resultSync => Promise.resolve({
                msg: 'Database Sync Done',
                result: resultSync
            }))
            .catch(errSync => Promise.reject({
                msg: 'Database Sync Failure',
                err: errSync
            }));
    }
}(module));