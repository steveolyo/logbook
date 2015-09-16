module.exports = function (app) {
    var MongoClient = require('mongodb').MongoClient;
    var Server = require('mongodb').Server;
    var ObjectID = require('mongodb').ObjectID;
    var requestCount = 0;
    var localDB="mongodb://localhost/mydb"
    var mongoLabDB="mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook";
    var dbString = localDB;
    userID="5568ae18bedbf74a32af6885";
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });




    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.get('/logbookdata', function (request, response) {
        var par = request.params;
        MongoClient.connect(dbString, function (err, db) {
                try {
                    if (err) {
                        console.log("dang, error");
                    }
                    else {

                        var collection = db.collection('logData');
                        collection.find({"userID": userID}).sort({date: 1}).toArray(function (err, docs) {
                            console.log("records:")
                            //console.log(docs);


                            requestCount++;
                            response.writeHead(200, {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*"
                            });
                            response.write(JSON.stringify(docs));
                            response.end();
                            console.log('finit')
                        })

                    }
                }
                catch (error) {
                    console.log("closing the db connection");
                    db.close();
                } finally {
                    console.log("finally closing the db")
                    // db.close();
                }
            }
        )
    })
    app.post('/deleteflight', function (req, res) {
        var flightNumber = req.body.flightNumber;


        console.log('delete flight ' + flightNumber);

        MongoClient.connect(dbString, function (err, db) {
            try {
                if (err) {
                    console.log("dang, error");
                }
                else {
                    console.log("we are deleting");
                    var collection = db.collection('logData');
                    var objectId = ObjectID(flightNumber);

                    collection.removeOne({"_id": ObjectID(flightNumber)}, function () {
                    });

                    collection = db.collection('logData');
                    collection.find({"userId": userID}).sort({date: 1}).toArray(function (err, docs) {
                        // console.log("records:")
                        // console.log(docs);


                        res.writeHead(200, {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"});
                        res.write(JSON.stringify(docs));
                        res.end();
                        console.log('finit')
                    })
                    console.log('finit deleting')

                }
            }
            catch (error) {
                console.log("error: closing the db connection");
                db.close();
            } finally {
                console.log("finally closing the db");
                // db.close();
            }
        })
    });
    app.post('/backuplocal', function (req, res) {
       var flightData = req.body.allFlights;
        MongoClient.connect("mongodb://localhost/mydb", function (err, db) {
            var collection = db.collection('logData');
            collection.remove();
            for (i=0;i<flightData.length;i++){
                console.log(flightData[i]);

              collection.insert(flightData[i], function (err, result) {}
                );
            }
            db.close();

        });

       /*     var mongoClient = new MongoClient(new Server('localhost', 27017));
        mongoClient.open(function(err, mongoClient) {
            var db1 = mongoClient.db("mydb");
            for (i=0;i<flightData.length;i++){

                db1.logData.insert(flightData[i], function (err, result) {}
                );
            }


            mongoClient.close();
        });
*/
    });
    app.post('/updateflight', function (req, res) {
        var flightData = req.body.flightData;

        var flightNumber = flightData._id;

        console.log('update flight ' + flightNumber);
        MongoClient.connect(dbString, function (err, db) {
            try {
                if (err) {
                    console.log("update, error");
                }
                else {
                    console.log("we are update");
                    var collection = db.collection('logData');

                    delete flightData._id;

                    flightData.userID = userID;


                    //collection.updateOne({"_id":ObjectID(flightNumber)},flightData,
                    collection.updateOne({"_id": ObjectID(flightNumber)}, flightData,
                        {upsert: true, w: 1}, function (err, result) {
                            console.log("updated")
                        });


                    //  collection.removeOne({"_id":ObjectID(flightNumber)},function(){
                    //  });

                    collection.find({"userId": userID}).sort({date: 1}).toArray(function (err, docs) {

                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*"
                        });
                        res.write(JSON.stringify(docs));
                        res.end();
                        console.log('finit');
                    });
                    console.log('finit updating')

                }
            }
            catch (error) {
                console.log("error: closing the db connection");
                db.close();
            } finally {
                console.log("finally closing the db");
                // db.close();
            }
        })
    });

    app.get('/logbook', function (req, res) {
        res.render('logbook.ejs', {
            user: req.user, // get the user out of session and pass to template
            totalHours: 10
        });
    });

};

