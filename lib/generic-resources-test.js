(function(module){
    'use strict';
    
    module.exports = function(request, model){
        let   chai = require("chai"),
              expect  = chai.expect,
              should = chai.should();

        before((done) => {
            request
                .get('/api/initDB')
                .send()
                .end((err,res) => {
                    done(err)
                });
        })

        describe("Testing API " + model.name, function () {

            describe("/GET " + model.name, () => {
                it("it should list all records", (done) => {
                    _listAllRecords(done, model.name);
                });
            });

            describe("/PUT " + model.name, () => {
                model.validations.forEach((validation) => { 
                    describe(validation.name, () => {
                        it(validation.specDescription.replace('${test}', 'fail'), (done) => {
                            _createNewRecord(done, model.name, validation.failDomain, (err,res) => {
                                res.status.should.be.eql(400);
                                res.body.should.be.a('object');
                                //res.body.have.property(validation.failSpecTest);
                                res.body[validation.failSpecTest].should.be.a('array');
                                res.body[validation.failSpecTest].length.should.be.gte(1);
                                done(err);
                            });
                        });
                        it(validation.specDescription.replace('${test}', 'success'), (done) => {
                            _createNewRecord(done, model.name, validation.successDomain, (err,res) => {
                                res.status.should.be.eql(200);
                                //res.body.length.should.be.gte(0);
                                done(err);
                            });
                        })
                    })
                    
                 })
                /*it("it should create a new record", (done) => {
                    _createNewRecord(done, model.name)
                });*/
            })

            //it("should return 200 OK", _200);
        });

        function _createFailWhenValidationFails(done,modelName){
            done();
        }

        function _listAllRecords(done, modelName){
            request
                .get('/api/'+modelName)
                .send()
                .end((err,res) => {
                    res.status.should.be.eql(200);
                    res.body.result.should.be.a('array');
                    res.body.length.should.be.gte(0);
                    done(err);
                });
        }

        function _createNewRecord(done, modelName, modelData, endCb) {
            request
                .put('/api/'+modelName)
                .send(modelData)
                .end(endCb);
        }
    }

}(module));