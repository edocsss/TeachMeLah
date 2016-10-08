//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var Majors = db.collection('majors');

module.exports = {
    getMajorList: getMajorList,
    initDummyData: initDummyData
};

function getMajorList (res) {
    Majors.find({}).toArray(function (err, docs) {
        res.status(200);
        res.json({
            majorList: docs
        });
    });
}

function initDummyData () {
    Majors.find({}).toArray(function (err, docs) {
        if (docs.length <= 0) {
            Majors.insert({
                name: 'Computer Science',
                icon: ''
            });

            Majors.insert({
                name: 'Computer Engineering',
                icon: ''
            });

            Majors.insert({
                name: 'Mechanical Engineering',
                icon: ''
            });

            Majors.insert({
                name: 'Electrical and Electronics Engineering',
                icon: ''
            });

            Majors.insert({
                name: 'Business',
                icon: ''
            });

            Majors.insert({
                name: 'Finance',
                icon: ''
            });
        }
    });
}