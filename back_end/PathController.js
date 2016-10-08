//define module needed here
var accountController = require("./AccontController");


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

    }
};