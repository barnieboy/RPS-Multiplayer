function thisMoment() {
  var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  $("#dateTime").append('<p>' + currentDate + '</p>');
  }
  thisMoment();



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCP_gmaPg_BH_1ZgWIPairUV_4x_puCs5M",
    authDomain: "trainscheduler-3916e.firebaseapp.com",
    databaseURL: "https://trainscheduler-3916e.firebaseio.com",
    storageBucket: "trainscheduler-3916e.appspot.com",
    messagingSenderId: "25344033343"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";
    var nextTrainArrival = "";
    var minutesAway = "";

    // Capture Button Click
    $("#click-button").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      trainTime = $("#time-input").val().trim();
      frequency = $("#freq-input").val().trim();
      var nextTrain = myFunction(trainTime, frequency);
      nextTrainArrival = nextTrain;
      minutesAway = minutesAway;
      console.log("next train arrival " + nextTrainArrival);
      $("input[type='text']").val("");
      $("input[type='number']").val("");
      $("input[data-date-format='HH:mm']").val("");

      

      // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime,
        nextTrainArrival: nextTrain,
        minutesAway: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    //====================================================

    function myFunction(tt, fr){
    
      var firstTimeConverted = moment(tt, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % fr;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = fr - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      minutesAway = tMinutesTillTrain;

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      return (moment(nextTrain).format("hh:mm"));

    }
    myFunction();

    //====================================================



      dataRef.ref().on("child_added", function(childSnapshot) {

      $("#trainSchedule").append("<tr><td span id='name'> " + childSnapshot.val().name + "</td>" +
        " </span><td span id='destination'> " + childSnapshot.val().destination + "</td>" +
        " </span><td span id='frequency'> " + childSnapshot.val().frequency + "</td>" +
        " </span><td span id='next'> " + childSnapshot.val().nextTrainArrival + "</td>" +
        " </span><td span id='minAway'> " + childSnapshot.val().minutesAway + "</td>" + " </span></div>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);

    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {

  });
