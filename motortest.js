var five = require("johnny-five");
var Spark = require("spark-io");
var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {
  var motorA;
  var motorB;

  motorA = new five.Motor({
    pins: {
      pwm: "A0",
      dir: "D0",
      cdir: "D1"
    }
  });

  motorB = new five.Motor({
    pins: {
      pwm: "A1",
      dir: "D2",
      cdir: "D3"
    }
  });

  board.repl.inject({
    motorA: motorA,
    motorB: motorB
  });

  motorA.on("start", function(err, timestamp) {
    console.log("start", timestamp);
  });

  motorA.on("stop", function(err, timestamp) {
    console.log("automated stop on timer", timestamp);
  });

  motorA.on("brake", function(err, timestamp) {
    console.log("automated brake on timer", timestamp);
  });

  /*motorA.on("forward", function(err, timestamp) {
    console.log("forward", timestamp);

    // demonstrate switching to reverse after 5 seconds
    board.wait(5000, function() {
      motor.reverse(255);
    });
  });

  motorA.on("reverse", function(err, timestamp) {
    console.log("reverse", timestamp);

    // demonstrate braking after 5 seconds
    board.wait(5000, function() {

      // Brake for 500ms and call stop()
      motor.brake(500);
    });
  });*/

  // set the motor going forward full speed
  //motor.forward(255);
});
