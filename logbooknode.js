var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json();
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

passport.use(new LocalStrategy(
    function(username,password, done){

console.log('local strategy');
/*
        User.findOne({username:username},function(err,user){
            if(err){return done(err);}
            if(!user){
                return done(null, false,{message:'bad username.'});
            }
            if(!user.validPassword(password)){
                return done(null, false,{message:'bad password'});
            }
            return done(null, user);
        });

*/

    process.nextTick(function(){    MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
                try {
                    if (err) {
                        console.log("dang, error in authentication");
                    }
                    else {
                        console.log("we are connected for login");
                        var collection = db.collection('users');
                        var userObj = collection.findOne({username:username}).toArray(function(err,user){
                            console.log("user:")
                            console.log(user);
                            if(err){
                                return done(err);
                            }
                            if(!user){
                                return done(null,false);
                            }
                            if(user.password != password){
                                return done(null, false,{message:'invalid password'});
                            }
                            db.close();
                            return done(null, user);

                        })

                    }
                }
                catch(error){
                    console.log("closing the db connection");
                    db.close();
                }finally {
                    console.log("finally closing the db")
                     db.close();
                }
            }
        )








         }
    )}
));


var http = require('http');
var requestCount = 0;

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var result = 'foo';
var count = "1";
var mydocument = {name:'foo'};


app.set('port', (process.env.PORT || 5000));
var cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendfile('./public/views/login.html');
});
app.get('/test',function(req,res){
    res.sendfile('./public/views/index.html');
});

app.post('/login',function(req,res,next){
    passport.authenticate('local',function(err,user,info) {
        if (err) {
            return next(err);
        }
        if (!user) {
          //  req.session.messages = 'no such user';
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/logbook');
        })
    })(req,res,next);

});

app.get('/about', function(req, res) {
    res.sendfile('./public/views/about.html');
});
app.get('/ui',function(req,res){
        res.sendfile('./public/views/uigrid.html');
    }
);
app.get('/app',function(req,res){
        res.sendfile('./public/views/logbook-app.html');
    }
);
app.get('/ng',function(req,res){
        res.sendfile('./public/views/logbook-ng.html');
    }
);
app.get('/nglog',function(req,res){
        res.sendfile('./public/views/logbook-ng.html');
    }
);
app.get('/example', function(request, response) {
    response.sendfile('./public/views/datatables-ajax.html');
});

app.post('/storeflight',function(req,res){
       console.log('store some data')
    }
);
app.post('/deleteflight',function(req,res){
        var flightNumber = req.body.flightNumber;

        console.log('delete flight '+flightNumber);

       MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
            try {
                if (err) {
                    console.log("dang, error");
                }
                else {
                    console.log("we are deleting");
                    var collection = db.collection('logData');
                    var objectId = ObjectID(flightNumber);

                    collection.removeOne({"_id":ObjectID(flightNumber)},function(){
                    });

                    collection.find().sort({date:1}).toArray(function(err,docs){
                        console.log("records:")
                        console.log(docs);


                        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                        res.write(JSON.stringify(docs));
                        res.end();
                        console.log('finit')
                    })
                    console.log('finit deleting')

                }
            }
            catch(error){
                console.log("error: closing the db connection");
                db.close();
            }finally {
                console.log("finally closing the db")
                // db.close();
            }
       })
});
app.post('/updateflight',function(req,res){
    var flightData = req.body.flightData;
    var flightNumber = flightData._id;

    console.log('update flight '+flightNumber);

    MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
        try {
            if (err) {
                console.log("update, error");
            }
            else {
                console.log("we are update");
                var collection = db.collection('logData');;
                var objectId = ObjectID(flightNumber);

                var fd = JSON.stringify(flightData);
                flightDta = '{"date":"2-77","make":"moon"}';
                delete flightData._id;


                //collection.updateOne({"_id":ObjectID(flightNumber)},flightData,
                collection.updateOne({"_id":ObjectID(flightNumber)},flightData,
                    {upsert:true, w: 1}, function(err, result)
                    {
                    console.log("updated")
                });


              //  collection.removeOne({"_id":ObjectID(flightNumber)},function(){
              //  });

                collection.find().sort({date:1}).toArray(function(err,docs){

                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                    res.write(JSON.stringify(docs));
                    res.end();
                    console.log('finit')
                })
                console.log('finit updating')

            }
        }
        catch(error){
            console.log("error: closing the db connection");
            db.close();
        }finally {
            console.log("finally closing the db")
            // db.close();
        }
    })
});
app.get('/logdata',function(request,response){
    var par = request.params

    MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
            try {
                if (err) {
                    console.log("dang, error");
                }
                else {
                    console.log("we are connected");
                    var collection = db.collection('logData');
                    collection.find().toArray(function(err,docs){
                        console.log("records:")
                        console.log(docs);

                        var rowArray = [];
                        var dataArray = [];
                        //res.setHeader('Content-Type', 'application/json');
                        // turn array of [{},{},{}] to array of arrays [[],[],[]]
                        var docArray,row;8
                        for(var i=0;i<docs.length;i++){
                            rowArray = [];
                            row = docs[i];

                            rowArray.push(row.user,row.date,row.make,row.Destination,row.Origin, row.PIC);
                            dataArray.push(rowArray);

                        }
                        var dataObj = {};
                        dataObj.draw=1;
                        dataObj.recordsTotal = dataArray.length;
                        dataObj.recordsFiltered = dataArray.length;
                        dataObj.data = dataArray;

                        requestCount++;
                        response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                        response.write(JSON.stringify(dataObj));
                        response.end();
                        console.log('finit')
                    })
                    console.log("sending json")
                }
            }
            catch(error){
                console.log("closing the db connection");
                db.close();
            }finally {
                console.log("finally closing the db")
                // db.close();
            }
        }
    )
})
app.get('/logbookdata',function(request,response){
    var par = request.params

    MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
            try {
                if (err) {
                    console.log("dang, error");
                }
                else {
                    console.log("we are connected");
                    var collection = db.collection('logData');
                    collection.find().sort({date:1}).toArray(function(err,docs){
                        console.log("records:")
                        console.log(docs);


                        requestCount++;
                        response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                        response.write(JSON.stringify(docs));
                        response.end();
                        console.log('finit')
                    })
                    console.log("sending json")
                }
            }
            catch(error){
                console.log("closing the db connection");
                db.close();
            }finally {
                console.log("finally closing the db")
                // db.close();
            }
        }
    )
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


