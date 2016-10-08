var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require("http");
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
var server = http.createServer(app);
server.listen({host : 'localhost',port : 8000});
console.log("http server listening on %d", 8000);
