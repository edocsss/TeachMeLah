//define module needed here
var accountController = require("./AccountController");
var majorController = require('./MajorController.js');
var requestController = require("./RequestController");
var courseController = require('./CourseController.js');
var tutorController = require('./TutorController.js');
var paypalController = require('./paypalController');
var chatController = require('./ChatController.js');

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
        });

        router.route("/cancelTutor").post(function(req,res){
            console.log("cancelling tutor");
            requestController.cancelTutor(req,res);
        });
        router.route('/tutor/details').post(function (req, res) {
            console.log('Getting tutor details..');
            tutorController.getTutorDetails(req.body, res);
        });
        router.route("/clientToken").get(function(req,res){
            paypalController.generateToken(res);
        });

        router.route("/createTranasaction").post(function(req,res){
            console.log("nonce from customer",req.body);
            paypalController.checkoutTransaction(req,res);
        });

        router.route('/chat/messages').post(function (req, res) {
            console.log('Getting message history..');
            chatController.getChatHistory(req.body, res);
        });
    }
};