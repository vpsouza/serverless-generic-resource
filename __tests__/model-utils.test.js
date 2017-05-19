'use strict';

const modelUtil = require('../lib/model-utils');

let ModelDef = {
        getRelations: () => ({
            address: {
                accessors: {
                    create: "createAddress",
                    get: "getAddress",
                    set: "setAddress"
                },
                as: "address",
                associationType: "HasOne",
                foreignKey: "customerId",
                foreignKeyAttribute: {
                    identifierField: "customerId",
                    isSelfAssociation: false,
                    isSingleAssociation: true,
                    source: { //Model
                        name: "customer"
                    },
                    sourceIdentifier: "id",
                    sourceKey: "id",
                    sourceKeyIsPrimary: true,
                    target: { //Model
                        name: "address"
                    }
                },
                source: { //Model
                    name: "customer"
                },
                target: { //Model
                    name: "address"
                }
            },
            contacts: {
                accessors: {
                    create: "createContact",
                    get: "getContact",
                    set: "setContact"
                },
                as: "contact",
                associationType: "HasOne",
                foreignKey: "customerId",
                foreignKeyAttribute: {
                    identifierField: "customerId",
                    isSelfAssociation: false,
                    isSingleAssociation: true,
                    source: { //Model
                        name: "customer"
                    },
                    sourceIdentifier: "id",
                    sourceKey: "id",
                    sourceKeyIsPrimary: true,
                    target: { //Model
                        name: "contact"
                    }
                },
                source: { //Model
                    name: "customer"
                },
                target: { //Model
                    name: "contact"
                }
            }
        }),
    };

let modelInstance = {
        contacts: [{id: 1},{id:2}],
        address: [{id:1},{id:2}]
    }

test('included models with includeRelName = true', () => {
    //[{"relName": "address", "target": {"name": "address"}}, {"relName": "contacts", "target": {"name": "address"}}]
    let resultIncludedModels = modelUtil.getIncludedModels(modelInstance, ModelDef, true);
    expect(Array.isArray(resultIncludedModels)).toBe(true);
    
    resultIncludedModels.forEach((elm) => {
        expect(elm).toHaveProperty('relName');
        expect(elm).toHaveProperty('target');
    });

    expect(resultIncludedModels).toContainEqual({"relName": "address", "target": {"name": "address"}});
    expect(resultIncludedModels).toContainEqual({"relName": "contacts", "target": {"name": "contact"}});
});

test('included models with includeRelName = false', () => {
    let resultIncludedModels = modelUtil.getIncludedModels(modelInstance, ModelDef, false);
    expect(Array.isArray(resultIncludedModels)).toBe(true);
    
    expect(resultIncludedModels).toContainEqual({"name": "address"});
    expect(resultIncludedModels).toContainEqual({"name": "contact"});
});