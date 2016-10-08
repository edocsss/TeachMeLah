//define module needed here
var accountController = require("./AccountController");
var majorController = require('./MajorController.js');
var requestController = require("./RequestController");

module.exports = {
    initPath : function(router){
        router.route('/login').post(function(req, res) {
            console.log("has logged in");
            var jsonRetrieved = req.body;
            accountController.signIn(jsonRetrieved,res);
        });

        router.route('/register').post( function(req,res){
            console.log("has registered");
            var jsonRetrieved = req.body;
            accountController.register(jsonRetrieved,res);
        });
        router.route('/major').get(function (req, res) {
            console.log('Getting major list...');
            majorController.getMajorList(res);
        });
        router.route('/requestTutor').post(function(req,res){
            console.log("request of tutor is made");

        });
    }
};