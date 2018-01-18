//
// Tests voor versie 1 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
process.env.NODE_ENV = 'test';

// needed for mocha
const mocha = require('mocha');
const describe = mocha.describe;
const before = mocha.before;
const after = mocha.after;
const it = mocha.it;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const mongoConnection = require('../model/db');
const should = chai.should();
const mongoose = require('mongoose');

chai.use(chaiHttp);


describe('Auth API v1', function() {
    it('returns an error on POST /api/v1/auth/register if password is not strong enough', function(done) {
        let user = {
            email: "rick@testest1.nl",
            password: "test",
            fullName: "Rick Lambrechts",
            phoneNumber: '0612345678'
        };
        chai.request(server)
            .post('/api/v1/auth/register')
            .send(user)
            .end(function(err, res) {
                console.dir(res.body);
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('error').that.is.a('string');
                res.body.error.should.equal('Registration not correct');
                done();
            });
    });

    it('returns an user on POST /api/v1/auth/register if ok', function(done) {
        let user = {
            email: "rick@testest1.nl",
            password: "Test@123",
            fullName: "Rick Lambrechts",
            phoneNumber: '0612345678'
        };
        chai.request(server)
            .post('/api/v1/auth/register')
            .send(user)
            .end(function(err, res) {
                console.dir(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                // TODO: Create next tests
                done();
            });
    });
});