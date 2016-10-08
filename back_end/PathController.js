//define module needed here
var accountController = require("./AccountController");
var majorController = require('./MajorController.js');
var requestController = require("./RequestController");
var courseController = require('./CourseController.js');
var tutorController = require('./TutorController.js');

module.exports = {
    initPath: function (router) {
        router.route('/login').post(function (req, res) {
            console.log("has logged in");
            var jsonRetrieved = req.body;
            accountController.signIn(jsonRetrieved, res);
        });
        router.route('/register').post(function (req, res) {
            console.log("has registered");
            var jsonRetrieved = req.body;
            accountController.register(jsonRetrieved, res);
        });
        router.route('/major').get(function (req, res) {
            console.log('Getting major list...');
            majorController.getMajorList(res);
        });

        router.route('/addRequest').post(function (req, res) {
            console.log("request of tutor is made");
            var jsonRetrieved = req.body;
            requestController.addRequest(jsonRetrieved, res);
        });

        router.route("/getListRequestTutor").post(function (req, res) {
            console.log("asking for list of tutor from tutee");
            var jsonRetrieved = req.body;
            requestController.getListTutor(jsonRetrieved, res);
        });

        router.route('/course').post(function (req, res) {
            console.log('Getting course list by major...');
            courseController.getCourseListByMajor(req.body, res);
        });

        router.route('/tutor').post(function (req, res) {
            console.log('Getting tutor list by major...');
            tutorController.getTutorListByMajor(req.body, res);
        })
    }
};