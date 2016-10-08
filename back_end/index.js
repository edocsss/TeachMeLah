var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require("http");
var router = express.Router();              // get an instance of the express Router
var pathController = require("./PathController");

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
pathController.initPath(router);
var server = http.createServer(app);
server.listen({host : 'localhost',port : 8000});
console.log("http server listening on %d", 8000);
