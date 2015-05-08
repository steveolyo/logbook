/**
 * Created by Steveo on 4/27/15.
 */

(function(){
    var app=angular.module('logbookapp',[]);

    app.controller('LogbookController', ['$scope',function($scope){
        this.flights = book;
        $scope.loggedFlight = book;


        $scope.flightcounter = book.length+1;



        $scope.addFlight = function(){
            $scope.loggedFlight.push({date:'',
                    make:'',
                    model:'',
                    TailNumber:'',
                    start:'',
                    destination:'',
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

            )
            $scope.flightcounter++;
        }


    }]);


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
