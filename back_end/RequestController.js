var mongojs = require('mongojs')
var db = mongojs('mydb');
var Requests = db.collection('requests');

module.exports = {
    addRequest: addRequest,
    getListTutor : getListTutor,
    getListTutee : getListTutor,
    cancelTutor  :cancellingTutorFromTutee,
    initDummyData : initDummyData
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
             "startTime" : "Aug 9,2016",
             "endTime" : "Aug 9, 2016",
             "accepted": false
        }
    * */
    console.log("request from tutee",req);
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


function getListTutee(req,res){
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
    console.log(reqBody);
    Requests.remove({
        _id: db.ObjectId(reqBody._id)
    });

    res.status(200);
    res.json({"delete":"OK"});
}

function initDummyData(){
    Requests.find({}).toArray(function (err, docs) {
        console.log(docs);
        if (docs.length <= 0) {
            Requests.insert({
                participants : {
                    emailTutor: 'edward@gmail.com',
                    emailTutee: 'sujono@gmail.com'
                },
                price: 10,
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
                price: 10,
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