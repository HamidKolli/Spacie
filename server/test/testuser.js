const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "test",
            date: "2001-04-08",
            email: "test@test.com",
            motDePasse: "test"
        };

        request
            .post('/api/user/signup')
            .send(user)

            .then((res) => {
                res.should.have.status(200);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user)
                        }),

                    request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

