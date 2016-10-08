var mongojs = require('mongojs')
var db = mongojs('mydb');
var Requests = db.collection('requests');

module.exports = {
    addRequest: addRequest,
    getListTutor : getListTutor,
    getListTutee : getListTuteeing,
    cancelTutor  :cancellingTutorFromTutee,
    getRequestDetailsById: getRequestDetailsById,
    initDummyData : initDummyData,
    updateRequestDate : updateRequestData
};

function addRequest(jsonData,res){
    Requests.insert(jsonData);
    res.status(200);
    res.json({"validated":"ok"});
}


function getListTutor(req,res){
    //return list of related tutor
    /*
        {
            "participants": {
                emailTutor : "edward",
                emailTutee : "sujono"
             },
             "price" : "12",
             "course" : "Computer Network",
             "topic" : "wow",
             "startTime" : "19:20",
             "endTime" : "20:20",
             "accepted": false,
             "date": "19-Septermber-2016"
        }
    * */
    var emailTutee = req["emailTutee"];
    Requests.find({"participants.emailTutee" : emailTutee}).toArray(function (err,docs) {
        if (docs.length > 0) {
            res.status(200);
            res.json(docs);
        } else {
            res.status(400);
            res.json({"validated":false});
        }
    });
}



function getListTuteeing(req,res){
    console.log("reqBody",req);
    var emailTutor = req["emailTutor"];
    Requests.find({"participants.emailTutor" : emailTutor}).toArray(function(err,docs){
        if(docs.length > 0){
            res.status(200);
            res.json(docs);
        } else{
            res.status(400);
            res.json({"validated":false});
        }
    });
}


function cancellingTutorFromTutee(req,res){
    var reqBody = req.body;
    Requests.remove({
        _id: db.ObjectId(reqBody._id)
    });

    res.status(200);
    res.json({"delete":"OK"});
}

function getRequestDetailsById(reqBody, res) {
    var requestId = reqBody.requestId;
    Requests.findOne({
        _id: db.ObjectId(requestId)
    }, function (err, doc) {
        res.status(200);
        res.json(doc);
    });
}

function initDummyData(){
    Requests.find({}).toArray(function (err, docs) {
        if (docs.length <= 0) {
            Requests.insert({
                participants : {
                    emailTutor: 'edward@gmail.com',
                    emailTutee: 'sujono@gmail.com'
                },
                price: 8.88,
                course : "computer science",
                topic : "computer networrks",
                startTime : new Date(2016,11,10,12,30),
                endTime : new Date(2016,11,10,13,30),
                accepted : false
            });


            Requests.insert({
                participants : {
                    emailTutor: 'wow@gmail.com',
                    emailTutee: 'sujono@gmail.com'
                },
                price: 7.65,
                course : "computer science",
                topic : "computer networrks",
                startTime : new Date(2016,11,10,12,30),
                endTime : new Date(2016,11,10,13,30),
                accepted : true
            });

            Requests.insert({
                participants : {
                    emailTutor: 'sujono@gmail.com',
                    emailTutee: 'edward@gmail.com'
                },
                price: 9.8,
                course : "computer science",
                topic : "computer networrks",
                startTime : new Date(2016,11,10,12,30),
                endTime : new Date(2016,11,10,13,30),
                accepted : false
            });


            Requests.insert({
                participants : {
                    emailTutor: 'sujono@gmail.com',
                    emailTutee: 'edssss@gmail.com'
                },
                price: 7.5,
                course : "computer science",
                topic : "computer networrks",
                startTime : new Date(2016,11,10,12,30),
                endTime : new Date(2016,11,10,13,30),
                accepted : true
            });

        }
    }
    );
}


function updateRequestData(req,res){
    console.log("update on "+req._id);
    Requests.update({_id: db.ObjectId(req._id)}, {$set: {accepted: true}}, {multi: false}, function () {
        // the update is complete
        res.status(200);
        res.json({"status":"OK"});
    });
}
