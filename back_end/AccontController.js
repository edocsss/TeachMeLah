//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var mycollection = db.collection('users');


module.exports = {
    signIn : function(req){
        var usersData = mycollection.find({});
    },
    register : function(req,res){
        mycollection.insert(req);
        res.json({"ok":"true"});
    }
};