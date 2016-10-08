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
                icon: 'ion-code'
            });

            Majors.insert({
                name: 'Sports Science',
                icon: 'ion-ios-basketball'
            });

            Majors.insert({
                name: 'Mechanical Engineering',
                icon: 'ion-gear-a'
            });

            Majors.insert({
                name: 'Aerospace Engineering',
                icon: 'ion-plane'
            });

            Majors.insert({
                name: 'Electrical and Electronics Engineering',
                icon: 'ion-battery-charging'
            });

            Majors.insert({
                name: 'Business',
                icon: 'ion-briefcase'
            });

            Majors.insert({
                name: 'Finance',
                icon: 'ion-arrow-graph-up-right'
            });
        }
    });
}