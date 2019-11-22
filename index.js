const restify = require('restify');
const callRoutes = require('./routes/rotafuncionarios');
const server = restify.createServer();
require("./model/swagger.js").swagger(server);
server.pre(restify.plugins.bodyParser());
server.pre(restify.plugins.queryParser());
server.listen(3000);
callRoutes(server);