var express = require('express');
var app = express();
var http = require('http');
var requestCount = 0;

/*var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

*/
 var MongoClient = require('mongodb').MongoClient;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var result = 'foo';
var count = "1";
var mydocument = {name:'foo'};
var getIris = function(){
console.log('getIris0');
//http.createServer(function(req,http_res){
//	  http_res.writeHead(200,{'Content-Type':'text/plain'});
  var response = '';
console.log('getIris1');
  
  var cradle = require('cradle');
  var connection = new(cradle.Connection)('https://logbook.iriscouch.com', 443
//, { auth: { username: 'username', password: 'password' } }
);
 var db = connection.database('logbook');
 /* db.save('document_key', 
	{
	 name : 'A Doc called document' 
   },
   function (err, res) {
      if (err) {
          // Handle error
          result += ' SAVE ERROR: Could not save record!!\n';
          console.log(result);
      } else {
          // Handle success
          result += ' SUCESSFUL SAVE\n';
          console.log(result);
      }
*/
      db.get('document_key', function (err, doc) {
    if (err) {
          // Handle error
          result = ' Load ERROR: Could not retrieve record!!\n';
          console.log(result);
      } else {
          // Handle success
          result = ' SUCESSFUL read\n';
          console.log(result);
      }
          result = ' DOCUMENT: ' + doc + '\n';
          console.log('doc'+result);
//          http_res.end(result);

          return result;
      });
 // });

//});
}

//WOW this is for iris, but I'm going to use mongolab here to test
app.set('port', (process.env.PORT || 5000));
var cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});
app.get('/about', function(req, res) {
    res.sendfile('./public/views/about.html');
});
app.get('/ui',function(req,res){
        res.sendfile('./public/views/uigrid.html');
    }
);
app.get('/test', function(request, response) {
        response.send(getIris());
        // response.send(result);
 });
app.get('/example', function(request, response) {
    response.sendfile('./public/views/datatables-ajax.html');
});

app.get('/logpolydata',function(request,response){

    MongoClient.connect("mongodb://aero2:topteam@ds041871.mongolab.com:41871/logbook",function(err,db){
            try {
                if (err) {
                    console.log("dang, error");
                }
                else {
                    console.log("we are connected");
                    var collection = db.collection('logData');
                    collection.find().toArray(function(err,docs){
                        //console.log("records:")
                        //console.log(docs);


                        //res.setHeader('Content-Type', 'application/json');


                        var polydoc =  {"draw":1,"recordsTotal":57,"recordsFiltered":57,"data":[["Tiger","Nixon","System Architect","Edinburgh",1303689600,320800],["Garrett","Winters","Accountant","Tokyo",1311552000,170750],["Ashton","Cox","Junior Technical Author","San Francisco",1231718400,86000],["Cedric","Kelly","Senior Javascript Developer","Edinburgh",1332979200,433060],["Airi","Satou","Accountant","Tokyo",1227830400,162700],["Brielle","Williamson","Integration Specialist","New York",1354406400,372000],["Herrod","Chandler","Sales Assistant","San Francisco",1344211200,137500],["Rhona","Davidson","Integration Specialist","Tokyo",1287014400,327900],["Colleen","Hurst","Javascript Developer","San Francisco",1252972800,205500],["Sonya","Frost","Software Engineer","Edinburgh",1229126400,103600]]}
                      /*  var bigArray =[];
                        var dataArray =[];
                        for (i = 0; i < docs.length; i++) {
                            dataArray =[];
                            row = docs[i];
                            username = row.user;
                            make = row.make;

                            destination = row.Destination;
                            date = row.date;
                            origin = row.Origin;
                            pilotInCommand = row.PIC;

                            id = row._id;


                           dataArray.push(row.user,row.make,row.Destination,row.Origin,row.PIC,row.make);
                           bigArray.push(dataArray);

                        }
                       var returnObj = {"draw":1,"recordsTotal":57,"recordsFiltered":57,"data":bigArray};
                       console.log ("obj"+JSON.stringify(returnObj));
*/

                        var polydoc2 = [
                            {"first_name":"Tiger","last_name":"Nixon","position":"System Architect","office":"Edinburgh","start_date":1303689600,"salary":320800},
                            {"first_name":"Garrett","last_name":"Winters","position":"Accountant","office":"Tokyo","start_date":1311552000,"salary":170750},
                            {"first_name":"Ashton","last_name":"Cox","position":"Junior Technical Author","office":"San Francisco","start_date":1231718400,"salary":86000},
                            {"first_name":"Cedric","last_name":"Kelly","position":"Senior Javascript Developer","office":"Edinburgh","start_date":1332979200,"salary":433060},
                            {"first_name":"Airi","last_name":"Satou","position":"Accountant","office":"Tokyo","start_date":1227830400,"salary":162700},
                            {"first_name":"Brielle","last_name":"Williamson","position":"Integration Specialist","office":"New York","start_date":1354406400,"salary":372000},
                            {"first_name":"Herrod","last_name":"Chandler","position":"Sales Assistant","office":"San Francisco","start_date":1344211200,"salary":137500},
                            {"first_name":"Rhona","last_name":"Davidson","position":"Integration Specialist","office":"Tokyo","start_date":1287014400,"salary":327900},
                            {"first_name":"Colleen","last_name":"Hurst","position":"Javascript Developer","office":"San Francisco","start_date":1252972800,"salary":205500},
                            {"first_name":"Sonya","last_name":"Frost","position":"Software Engineer","office":"Edinburgh","start_date":1229126400,"salary":103600},
                            {"first_name":"Jena","last_name":"Gaines","position":"Office Manager","office":"London","start_date":1229644800,"salary":90560},
                            {"first_name":"Quinn","last_name":"Flynn","position":"Support Lead","office":"Edinburgh","start_date":1362268800,"salary":342000},
                            {"first_name":"Charde","last_name":"Marshall","position":"Regional Director","office":"San Francisco","start_date":1224115200,"salary":470600},
                            {"first_name":"Haley","last_name":"Kennedy","position":"Senior Marketing Designer","office":"London","start_date":1355788800,"salary":313500},
                            {"first_name":"Tatyana","last_name":"Fitzpatrick","position":"Regional Director","office":"London","start_date":1268784000,"salary":385750},
                            {"first_name":"Michael","last_name":"Silva","position":"Marketing Designer","office":"London","start_date":1353974400,"salary":198500},
                            {"first_name":"Paul","last_name":"Byrd","position":"Chief Financial Officer (CFO)","office":"New York","start_date":1276041600,"salary":725000},
                            {"first_name":"Gloria","last_name":"Little","position":"Systems Administrator","office":"New York","start_date":1239321600,"salary":237500},
                            {"first_name":"Bradley","last_name":"Greer","position":"Software Engineer","office":"London","start_date":1350086400,"salary":132000},
                            {"first_name":"Dai","last_name":"Rios","position":"Personnel Lead","office":"Edinburgh","start_date":1348617600,"salary":217500},
                            {"first_name":"Jenette","last_name":"Caldwell","position":"Development Lead","office":"New York","start_date":1315008000,"salary":345000},
                            {"first_name":"Yuri","last_name":"Berry","position":"Chief Marketing Officer (CMO)","office":"New York","start_date":1245888000,"salary":675000},
                            {"first_name":"Caesar","last_name":"Vance","position":"Pre-Sales Support","office":"New York","start_date":1323648000,"salary":106450},
                            {"first_name":"Doris","last_name":"Wilder","position":"Sales Assistant","office":"Sidney","start_date":1284940800,"salary":85600},
                            {"first_name":"Angelica","last_name":"Ramos","position":"Chief Executive Officer (CEO)","office":"London","start_date":1255046400,"salary":1200000},
                            {"first_name":"Gavin","last_name":"Joyce","position":"Developer","office":"Edinburgh","start_date":1292976000,"salary":92575},
                            {"first_name":"Jennifer","last_name":"Chang","position":"Regional Director","office":"Singapore","start_date":1289692800,"salary":357650},
                            {"first_name":"Brenden","last_name":"Wagner","position":"Software Engineer","office":"San Francisco","start_date":1307404800,"salary":206850},
                            {"first_name":"Fiona","last_name":"Green","position":"Chief Operating Officer (COO)","office":"San Francisco","start_date":1268265600,"salary":850000},
                            {"first_name":"Shou","last_name":"Itou","position":"Regional Marketing","office":"Tokyo","start_date":1313280000,"salary":163000},
                            {"first_name":"Michelle","last_name":"House","position":"Integration Specialist","office":"Sidney","start_date":1306972800,"salary":95400},
                            {"first_name":"Suki","last_name":"Burks","position":"Developer","office":"London","start_date":1256169600,"salary":114500},
                            {"first_name":"Prescott","last_name":"Bartlett","position":"Technical Author","office":"London","start_date":1304726400,"salary":145000},
                            {"first_name":"Gavin","last_name":"Cortez","position":"Team Leader","office":"San Francisco","start_date":1224979200,"salary":235500},
                            {"first_name":"Martena","last_name":"Mccray","position":"Post-Sales support","office":"Edinburgh","start_date":1299628800,"salary":324050},
                            {"first_name":"Unity","last_name":"Butler","position":"Marketing Designer","office":"San Francisco","start_date":1260316800,"salary":85675},
                            {"first_name":"Howard","last_name":"Hatfield","position":"Office Manager","office":"San Francisco","start_date":1229385600,"salary":164500},
                            {"first_name":"Hope","last_name":"Fuentes","position":"Secretary","office":"San Francisco","start_date":1265932800,"salary":109850},
                            {"first_name":"Vivian","last_name":"Harrell","position":"Financial Controller","office":"San Francisco","start_date":1234569600,"salary":452500}
                        ];
                        response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                        response.write(JSON.stringify(polydoc));
                        response.end();
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

app.get('/logdata',function(request,response){
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
                        var docArray,row;
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

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


