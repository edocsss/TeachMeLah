//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var Users = db.collection('users');

module.exports = {
    signIn: signIn,
    register : register,
    initDummyData: initDummyData
};

function signIn (req,res){
    var email = req["email"];
    var password = req["password"];
    console.log(email, password);

    Users.find({"email": email, "password": password}).toArray(function (err, docs) {
        console.log(docs.length);
        if (docs.length > 0) {
            var user = docs[0];
            res.status(200);
            res.json({
                verified: true,
                type: user.type
            });
        } else {
            res.status(400);
            res.json({"verified": false});
        }
    });
}

function register (userData, res){
    Users.insert(userData);
    res.json({"ok":"true"});
}

function initDummyData () {
    Users.find({}).toArray(function (err, docs) {
        console.log(docs);
        if (docs.length <= 0) {
            Users.insert({
                email: 'tutee1@teachmelah.com',
                password: '12345678',
                fullName: 'Tutee 1',
                phone: '12345678',
                type: 'tutee'
            });

            Users.insert({
                email: 'tutee2@teachmelah.com',
                password: '12345678',
                fullName: 'Tutee 2',
                phone: '12345678',
                type: 'tutee'
            });
        }
    });
}