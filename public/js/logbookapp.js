/**
 * Created by Steveo on 4/27/15.
 * Some work was copied from http://codepen.io/calendee/pen/buCHf
 */

(function(){
    var app=angular.module('logbookapp',[]);


    app.controller('LogbookController', function($scope,$http){

        $scope.showModel=true;
        $scope.showMake=true;
        $scope.flightcounter=0;
        $scope.loggedFlight=0;
        $scope.newFlight=0;
        $scope.flightId=0;
        $scope.user=0;
        $scope.totalHours=0;
        $scope.rowFlightId=0;
        $scope.flightToUpdate;




        $scope.refresh = function() {
            $http.get('/logbookdata')
                .success(function (data, status, headers, config) {
                    $scope.loggedFlight = data;
                    $scope.flightcounter = data.length + 1;

                    var hour, flightDate;
                    $scope.totalHours = 0;

                    for (i = 0; i < $scope.flightcounter; i++) {
                        if ($scope.loggedFlight[i]) {
                            hour = $scope.loggedFlight[i].TotalDurationOfFlight;
                            flightDate = new Date($scope.loggedFlight[i].date);
                            $scope.loggedFlight[i].date = flightDate;
                            //$scope.user = user;

                            $scope.totalHours += Number(hour);
                        }
                    }


                })
                .error(function (data, status, headers, config) {

                })

        }
        $scope.refresh();

        $scope.hideDate = function(){
            document.getElementById("logtable").classList.toggle("hide2")
        }

        $scope.createEmptyFlight = function(){
            var newFlight =     {

                date:new Date(),
                make:'',
                model:'',
                TaiNumber:'',
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
            return newFlight;
        }

        $scope.addFlight = function(){

            var blankFlight = $scope.createEmptyFlight();


            $scope.loggedFlight.push(blankFlight);
            $scope.flightcounter++;

            //save the flight



        }
        $scope.editField=function(id){
            //alert(id);
            $scope.flightId = id;
        }
        $scope.editRow=function(id){
            $scope.rowFlightId = id;
        }
        $scope.showControls=function(id){

            if(id == $scope.rowFlightId){
                return true;
            }
            return false;
        }
        $scope.showEdit=function(id){
            if(id == $scope.flightId){
                return true;
            }
            return false;
        }
        $scope.duplicateOriginal=function(original){
            var blankFlight = $scope.createEmptyFlight();

                blankFlight.date=new Date(original.date);
                blankFlight.make=original.make;
                blankFlight.model=original.model;
                blankFlight.TaiNumber=original.TaiNumber;
                blankFlight.Origin=original.Origin;
                blankFlight.Destination=original.Destination;
                blankFlight.OtherAirports=original.OtherAirports;
                blankFlight.SingleEngine=original.SingleEngine;
                blankFlight.MultiEngine=original.MultiEngine;
                blankFlight.GroundTrainer=original.GroundTrainer;
                blankFlight.DualReceived=original.DualReceived;
                blankFlight.PilotInCommand=original.PilotInCommand;
                blankFlight.Day=original.Day;
                blankFlight.Night=original.Night;
                blankFlight.CrossCountry=original.CrossCountry;
                blankFlight.ActualInstrument=original.ActualInstrument;
                blankFlight.SimulatedInstrument=original.SimulatedInstrument;
                blankFlight.NumberOfInstrumentApproaches=original.NumberOfInstrumentApproaches;
                blankFlight.NumberOfDayLandings=original.NumberOfDayLandings;
                blankFlight.NumberOfNightLandings=original.NumberOfNightLandings;
                blankFlight.TotalDurationOfFlight=original.TotalDurationOfFlight;
                blankFlight.description=original.description;
            return blankFlight;

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

        getFlightById = function(flightNumber){
            var len = $scope.loggedFlight.length;
            for(i = 0; i<len;i++){
                if($scope.loggedFlight[i]._id === flightNumber){
                    return $scope.loggedFlight[i];
                }
            }

        }
        $scope.indexOfFlight = function(flightId){


            var loopi;
            for(loopi = 0; loopi<$scope.loggedFlight.length;loopi++){
                if($scope.loggedFlight[loopi]._id == flightId){
                    return loopi + 1;
                }

            }
            return 0;

        }
        $scope.duplicateFlight = function(flightNumber){

            var original = getFlightById(flightNumber);

            var indexOfOriginal = $scope.indexOfFlight(flightNumber);

            $scope.newFlight = $scope.duplicateOriginal(original);
            $scope.loggedFlight.splice(indexOfOriginal,0,$scope.newFlight);

        }
        $scope.deleteFlight = function(flightNumber){
            console.log("delete "+flightNumber);




            for(i = 0; i<$scope.loggedFlight.length;i++){
                if ($scope.loggedFlight[i]._id == flightNumber){
                    break;
                }

            }
            console.log("delete"+i)

            $scope.loggedFlight.splice(i,1);
            $http.post('/deleteflight',{flightNumber:flightNumber})
                .success(function(data,status,headers,config){
                    $scope.loggedFlight = data;
                    $scope.flightcounter = data.length+1;
                    $scope.refresh();
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
            $scope.flightToUpdate = $scope.getObjectByID(flightNumber,$scope.loggedFlight)


            console.log("updating ...");
            //set id to null so the edit for that row won't show up.
            $scope.flightId = null;

            $http.post('/updateflight',{"flightData":$scope.flightToUpdate})
                .success(function(data,status,headers,config){
                    console.log("updated");
                    $scope.loggedFlight = data;
                    $scope.flightcounter = data.length+1;
                    $scope.refresh();

                })
                .error(function(data,status,headers,config){

                })
        }
        $scope.backupFlight = function(){


            // get object from group by ID

            console.log("updating ...");
            //set id to null so the edit for that row won't show up.
            $scope.flightId = null;

            $http.post('/backuplocal',{"allFlights":$scope.loggedFlight})
                .success(function(data,status,headers,config){
                    console.log("backuped");


                })
                .error(function(data,status,headers,config){

                })
        }


    });

})();
