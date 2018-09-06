const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/utils/connect');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goals');

const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
    // eslint-disable-next-line
    console.log('Server jammin\' on', server.address().port);
});