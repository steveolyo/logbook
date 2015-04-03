$(document).ready(function () {

    $("#getdata").click(function () {
        $("#entry1").val("implement getiris");
        var myData = "";

        $.ajax({

            url: 'http://logbook.iriscouch.com/logbook/4',
            data: myData,
            type: 'GET',

            dataType: 'jsonp',
            success: function (data) {
                alert("Success");
            },
            error: function () {
                alert('Failed!');
            }

        });
    });

    var logColData =
        ["fruit", "alice", "bill", "casey"];
    var logData =
        [
            [ "apple", 4, 10, 2 ],
            [ "banana", 0, 4, 0 ],
            [ "grape", 2, 3, 5 ],
            [ "pear", 4, 2, 8 ],
            [ "strawberry", 0, 14, 0 ]
        ];

    $("#getlogdatafrommongo").click(function () {
        $("#entry2").val("getting mongo data");
        //mongolab call
        //mongodb://aeroflyer:r_vP-qvcY9@ds041871.mongolab.com:41871/logbook
        var mongoData;
        $.ajax({

            url: 'logdata',
            data: mongoData,
            type: 'GET',

            dataType: 'json',
            success: function (data) {
                //  console.log(data);
                //    logData = data;
            },
            error: function () {
                alert('Failed!');
            }
        });
    });

    $("#getmongodata").click(function () {
        $("#entry2").val("getting mongo data");
        //mongolab call
        //mongodb://aeroflyer:r_vP-qvcY9@ds041871.mongolab.com:41871/logbook
        var mongoData;
        $.ajax({

            url: 'logdata',
            data: mongoData,
            type: 'GET',

            dataType: 'json',
            success: function (data) {
                //  console.log(data);
                var outhtml = "<tr><th>Date</th><th>AirCraft <br>Make & Model</th>" +
                    "<th>Aircraft <BR/>Identification</th><th>From</th><th>To</th>" +
                    "<th>Airplane <br/>SEL</th><th>Airplane<br/>MEL</th><th>Ground <br/>Trainer</th>" +
                    "<th>Dual <br/>Received</th><th>Pilot-in-<br/>Command</th><th>Day</th><th>Night</th><th>Cross-<br/>Country</th>" +
                    "<th>Actual <BR/>Instrument</th><th>Simulated<br/>Instrument</th><th>No.<Br/>Instrument<Br/>Approaches</th>" +
                    "<th>No.<BR/>LDG <BR/>DAY</th><th>No.<BR/>LDG <BR/>Night</th><th>Total<BR/>Duration<BR/>of Flight</th><th>Remarks, Procedures, Maneuvers</th></tr>";
                var date;
                var make;
                var model;
                var destination;
                var tailNumber = '';
                var username = '';
                var row = '';
                var origin = '';
                var singleEngineLandTime = "  ";
                var multiEngineLandTime = " ";
                var groundTrainer = "";
                var dualReceived = "";
                var pilotInCommand = "";
                var dayTimeHours = '';
                var nightTimeHours = '';
                var crossCountry = '';
                var actualInstrument = '';
                var simulatedInstrument = '';
                var instrumentApproaches = '';
                var dayLandings = '';
                var nightLandings = '';
                var totalDurationOfFlight = '';
                var remarks = '';
                var procedures;
                var maneuvers;
                var id;
                var startTime = new Date().getTime();


                for (i = 0; i < data.length; i++) {
                    row = data[i];
                    username = row.user;
                    make = row.make;

                    destination = row.Destination;
                    date = row.date;
                    origin = row.Origin;
                    pilotInCommand = row.PIC;

                    id = row._id;

                    outhtml += "<tr class='trfoo' id=\'" + id + "\'>"
                    outhtml += "<td class ='line' id='date-'+id>>" + date + "</td>";

                    outhtml += "<td class ='line' id='make-'+id>" + make + "</td>";
                    outhtml += "<td class ='line'>" + tailNumber + "</td>";
                    outhtml += "<td class ='line'>" + origin + "</td>";
                    outhtml += "<td class ='line'>" + destination + "</td>";
                    outhtml += "<td class ='line'>" + singleEngineLandTime + "</td>";
                    outhtml += "<td class ='line'>" + multiEngineLandTime + "</td>";
                    outhtml += "<td class ='line'>" + groundTrainer + "</td>";
                    outhtml += "<td class ='line'>" + dualReceived + "</td>";
                    outhtml += "<td class ='line'>" + dualReceived + "</td>";
                    outhtml += "<td class ='line'>" + pilotInCommand + "</td>";
                    outhtml += "<td class ='line'>" + dayTimeHours + "</td>";
                    outhtml += "<td class ='line'>" + nightTimeHours + "</td>";
                    outhtml += "<td class ='line'>" + crossCountry + "</td>";
                    outhtml += "<td class ='line'>" + actualInstrument + "</td>";
                    outhtml += "<td class ='line'>" + simulatedInstrument + "</td>";
                    outhtml += "<td class ='line'>" + instrumentApproaches + "</td>";
                    outhtml += "<td class ='line'>" + dayLandings + "</td>";
                    outhtml += "<td class ='line'>" + dayLandings + "</td>";
                    outhtml += "<td class ='line'>" + remarks + "</td>";
                    // outhtml +="<td class ='line'>"+id+"</td>";
                    outhtml += "</tr>";
                    $("#logpage").on('click', '#' + id,
                        function (eventObject) {

                            getLogbookRow(this);
                        });

                }


                var endTime = new Date().getTime();
                var elapsedTime = endTime - startTime;
                console.log('for loop milliseconds=' + elapsedTime)

                $("#logpage").html(outhtml);

                $("#entry2").val(data[1].Destination)

            },
            error: function () {
                alert('Failed!');
            }
        });//end of ajax call
    }); //end of click function

});//end of doc ready

var getLogbookRow = function (row) {
    eventId = $(row).attr('id');
    parentID = $(row).parent().attr('id');

    var trChildren = $(row).children();
    var arrayLength = trChildren.length
    for (var i = 0; i < arrayLength; i++) {
        console.log(trChildren[i].innerText);
    }

    console.log("get row" + "func" + eventId);
}