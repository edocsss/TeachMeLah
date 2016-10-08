//use mongoDB as the database
var mongojs = require('mongojs')
var db = mongojs('mydb');
var Courses = db.collection('courses');

module.exports = {
    getCourseListByMajor: getCourseListByMajor,
    initDummyData: initDummyData
};

function getCourseListByMajor (reqBody, res) {
    var majorName = reqBody.majorName;
    Courses.find({
        major: majorName
    }).toArray(function (err, docs) {
        res.status(200);
        res.json({
            courseList: docs
        });
    });
}

function initDummyData () {
    Courses.find({}).toArray(function (err, docs) {
        if (docs.length <= 0) {
            var courseList = {
                'Computer Science': [
                    'Data Structures',
                    'Algorithms',
                    'Object Oriented Programming',
                    'Database Principles',
                    'Software Engineering',
                    'Operating Systems',
                    'Human Computer Interaction',
                    'Digital Logic',
                    'Discrete Mathematics',
                    'Engineering Mathematics'
                ],

                'Business': [
                    'Business Law',
                    'Business Finance',
                    'Marketing 101',
                    'Accounting',
                    'Investments',
                    'Global Business Strategy'
                ],

                'Sports Science': [
                    'Human Anatomy',
                    'Applied Statistics',
                    'Sports Injuries',
                    'Exercise Physiology',
                    'Motor Behaviour'
                ],

                'Mechanical Engineering': [
                    'Mathematics 1',
                    'Mathematics 2',
                    'Physics 1',
                    'Physics 2',
                    'Mechatronics',
                    'Thermodynamics',
                    'Industrial Design',
                    'Robotics'
                ],

                'Aerospace Engineering': [
                    'Thermodynamics',
                    'Physics A',
                    'Engineering Mathematics',
                    'Engineering Graphics',
                    'Flight Dynamics',
                    'Aircraft Design',
                    'Operations Research'
                ],

                'Electrical and Electronics Engineering': [
                    'Computing',
                    'Mathematics 1',
                    'Mathematics 2',
                    'Circuit Analysis',
                    'Analog Electronics',
                    'Signals and Systems',
                    'Microprocessors',
                    'Digital Electronics'
                ],

                'Finance': [
                    'Business Finance',
                    'Investments',
                    'Derivative Securities',
                    'Financial Modelling',
                    'Alternative Investments',
                    'Portfolio Management'
                ]
            };

            for (var key in courseList) {
                for (var i in courseList[key]) {
                    Courses.insert({
                        name: courseList[key][i],
                        major: key
                    });
                }
            }
        }
    });
}