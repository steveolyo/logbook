module.exports = function (app, passport) {
    var MongoClient = require('mongodb').MongoClient;
    var Server = require('mongodb').Server;
    var ObjectID = require('mongodb').ObjectID;
    var requestCount = 0;
    var localDB="mongodb://localhost/mydb"
    var mongoLabDB="mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook";
    var dbString = mongoLabDB;
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        try {
            // render the page and pass in any flash data if it exists
            res.render('login.ejs', {message: req.flash('loginMessage')});
        } catch (er) {
            console.log("error");
        }


    });
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/logbook', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.get('/logbookdata', function (request, response) {
        var par = request.params;
        var userId = request.session.passport.user;
        MongoClient.connect(dbString, function (err, db) {
                try {
                    if (err) {
                        console.log("dang, error");
                    }
                    else {
                        console.log("data for the userID:" + userId);
                        var collection = db.collection('logData');
                        collection.find({"userID": userId}).sort({date: 1}).toArray(function (err, docs) {
                            //console.log("records:")
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

        var userId = req.session.passport.user;

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
                    collection.find({"userId": userId}).sort({date: 1}).toArray(function (err, docs) {
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
        var userId = req.session.passport.user;

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

                    flightData.userID = userId;


                    //collection.updateOne({"_id":ObjectID(flightNumber)},flightData,
                    collection.updateOne({"_id": ObjectID(flightNumber)}, flightData,
                        {upsert: true, w: 1}, function (err, result) {
                            console.log("updated")
                        });


                    //  collection.removeOne({"_id":ObjectID(flightNumber)},function(){
                    //  });

                    collection.find({"userId": userId}).sort({date: 1}).toArray(function (err, docs) {

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
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // logbook SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/logbook', isLoggedIn, function (req, res) {
        res.render('logbook.ejs', {
            user: req.user, // get the user out of session and pass to template
            totalHours: 10
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}