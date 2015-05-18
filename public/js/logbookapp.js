/**
 * Created by Steveo on 4/27/15.
 * Some work was copied from http://codepen.io/calendee/pen/buCHf
 */

(function(){
    var app=angular.module('logbookapp',[]);


    app.controller('LogbookController', function($scope,$http){
        this.flights = book;


        $scope.flightcounter;
        $scope.loggedFlight;
        $scope.newFlight;
        $http.get('/logbookdata')
            .success(function(data,status,headers,config){
               $scope.loggedFlight = data;
               $scope.flightcounter = data.length+1;

            })
            .error(function(data,status,headers,config){

            })


        $scope.hideDate = function(){
            document.getElementById("logtable").classList.toggle("hide2")
        }



        $scope.addFlight = function(){


            $scope.newFlight =     {

                    date:'',
                    make:'',
                    model:'',
                    TailNumber:'',
                    Origin:'',
                    Destination:'',
                    OtherAirports:[],
                    SingleEngine:0,
                    MultiEngine:0,
                    GroundTrainer:0,
                    DualReceived:0,
                    PilotInCommand:0,
                    Day:0,
                    Night:0,
                    CrossCountry:0,
                    ActualInstrument:0,
                    SimulatedInstrument:0,
                    NumberOfInstrumentApproaches:0,
                    NumberOfDayLandings:0,
                    NumberOfNightLandings:0,
                    TotalDurationOfFlight:0,
                    description:''}

            $scope.loggedFlight.push($scope.newFlight);
            $scope.flightcounter++;

            //save the flight



        }
        $scope.getObjectByID = function(objid,dataArray){

            var arrLen = dataArray.length;
            var returnObject = null;

            for(i=0;i<arrLen;i++) {
                if (dataArray[i]._id == objid) {
                    returnObject = dataArray[i];
                    break;

                }
            }
            return returnObject;
        }

        $scope.deleteFlight = function(flightNumber){
            console.log("delete "+flightNumber);
            $http.post('/deleteflight',{flightNumber:flightNumber})
                .success(function(data,status,headers,config){
                    $scope.loggedFlight = data;
                    $scope.flightcounter = data.length+1;
                })
                .error(function(data,status,headers,config){
                    console.log("couldn't delete");
                })
        }
        $scope.storeFlight = function(flightNumber){

            $http.post('/storeflight',$scope.newFlight)
                .success(function(data,status,headers,config){
                    //what to do if success.
                    // Really shouldn't store until saved.

                })
                .error(function(data,status,headers,config){

                })
        }

        $scope.updateFlight = function(flightNumber){


            // get object from group by ID
            $scope.updateFlight = $scope.getObjectByID(flightNumber,$scope.loggedFlight)


            $http.post('/updateflight',{"flightData":$scope.updateFlight})
                .success(function(data,status,headers,config){
                    $scope.loggedFlight = data;
                    $scope.flightcounter = data.length+1;
                })
                .error(function(data,status,headers,config){

                })
        }



    });


    // could create a directive
    var book =[{
            date:'3/14/2015',
            make:'Piper',
            model:'Warrior',
            TailNumber:'N33363',
            start:'U42',
            destination:'U42',
            OtherAirports:[],
            SingleEngine:.7,
            MultiEngine:0,
            GroundTrainer:0,
            DualReceived:0,
            PilotInCommand:.7,
            Day:.7,
            Night:0,
            CrossCountry:0,
            ActualInstrument:0,
            SimulatedInstrument:0,
            NumberOfInstrumentApproaches:0,
            NumberOfDayLandings:5,
            NumberOfNightLandings:0,
            TotalDurationOfFlight:.7,
            description:'Touch and Go Practice.'
        },{
            date:'3/27/2015',
            make:'Piper',
            model:'Warrior',
        TailNumber:'N33363',
            start:'U42',
            destination:'U42',
            OtherAirports:['PVU'],
            SingleEngine:1.3,
            MultiEngine:0,
            GroundTrainer:0,
            DualReceived:0,
            PilotInCommand:1.3,
            Day:1.3,
            Night:0,
            CrossCountry:0,
            ActualInstrument:0,
            SimulatedInstrument:0,
            NumberOfInstrumentApproaches:0,
            NumberOfDayLandings:4,
            NumberOfNightLandings:0,
            TotalDurationOfFlight:1.3,
            description:'Flight with Kyra over Orem and Provo'
        },
        {
            date:'4/22/2015',
            make:'Mooney',
            model:'M20F',
            TailNumber:'N9084V',
            start:'KAPA',
            destination:'KAPA',
            OtherAirports:[],
            SingleEngine:1.2,
            MultiEngine:0,
            GroundTrainer:0,
            DualReceived:0,
            PilotInCommand:1.2,
            Day:1.2,
            Night:0,
            CrossCountry:0,
            ActualInstrument:0,
            SimulatedInstrument:0,
            NumberOfInstrumentApproaches:0,
            NumberOfDayLandings:1,
            NumberOfNightLandings:0,
            TotalDurationOfFlight:1.2,
            description:"Picked up Mooney at Centennial. Robert Brawn (CFI) Travelled with us. He thought the Ammeter was showing a discharge, so we flew it back to talk to the mechanic, Scott Utz. Scott looked at it and it is fine, it just doesn't move much"
        },
        {
            date: '4/22/2015',
            make: 'Mooney',
            model: 'M20F',
            TailNumber: 'N9084V',
            start: 'KAPA',
            destination: 'KRKS',
            OtherAirports: [],
            SingleEngine: 2.6,
            MultiEngine: 0,
            GroundTrainer: 0,
            DualReceived: 0,
            PilotInCommand: 2.6,
            Day: 2.6,
            Night: 0,
            CrossCountry: 0,
            ActualInstrument: 0,
            SimulatedInstrument: 0,
            NumberOfInstrumentApproaches: 0,
            NumberOfDayLandings: 1,
            NumberOfNightLandings: 0,
            TotalDurationOfFlight: 2.6,
            description: "After getting the Ammeter checked, I took off with Robert Brawn (CFI) in the front right seat, " +
            "Mike Gibby was in the back. Flew through a little rain and snow. Some very light ice formed on the left wing." +
            "Flew through many cloud openings. Very interesting flight. Mike took over in Rock Springs and flew to U42"
        },
        {
            date: '4/30/2015',
            make: 'Mooney',
            model: 'M20F',
            TailNumber: 'N9084V',
            start: 'U42',
            destination: 'U42',
            OtherAirports: [],
            SingleEngine: 1.2,
            MultiEngine: 0,
            GroundTrainer: 0,
            DualReceived: 0,
            PilotInCommand: 1.2,
            Day: 1.2,
            Night: 0,
            CrossCountry: 0,
            ActualInstrument: 0,
            SimulatedInstrument: 0,
            NumberOfInstrumentApproaches: 0,
            NumberOfDayLandings: 1,
            NumberOfNightLandings: 0,
            TotalDurationOfFlight: 1.2,
            description: "Many landings with Mike Johnston, CFI who flys for American Airlines"
        }


    ]
})();
