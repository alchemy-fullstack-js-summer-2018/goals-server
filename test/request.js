const chai = require('chai');
const { assert } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const http = require('http');

const app = require('../lib/app');

const server = http.createServer(app);
const request = chai.request(server);
request.checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

after(() => server.close());

module.exports = request;