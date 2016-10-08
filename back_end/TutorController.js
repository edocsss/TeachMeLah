//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var Users = db.collection('users');

module.exports = {
    getTutorListByMajor: getTutorListByMajor
};

function getTutorListByMajor (reqBody, res) {
    var majorName = reqBody.majorName;
    Users.find({
        major: majorName
    }).toArray(function (err, docs) {
        res.status(200);
        res.json({
            tutorList: docs
        });
    });
}