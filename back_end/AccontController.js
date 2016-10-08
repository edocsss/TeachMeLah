//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var mycollection = db.collection('users');


module.exports = {
    signIn : function(req,res){
        var email = req["email"];
        var password = req["password"];
        mycollection.find({"name":"test","password":password}).toArray(function (err, docs) {
            console.log(docs.length);
            if(docs.length > 0){
                res.json({"verified": true});
            }else{
                res.json({"verified": false});
            }
        });
    },
    register : function(req,res){
        mycollection.insert(req);
        res.json({"ok":"true"});
    }
};