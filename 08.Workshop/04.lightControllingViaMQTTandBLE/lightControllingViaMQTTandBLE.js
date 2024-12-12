let topic = "/myhome/lamp";
let message;
const BLUMotionTriggered = "bthomesensor:208";
const BLUButtonClicked = "bthomesensor:201";

function publishMQTT(boolean) {
  message = JSON.stringify({"message": boolean ? "ON" : "OFF"});
  let result = MQTT.publish(topic, message);
  console.log("MQTT RESULT:", result);
  if (result) {
    console.log("Message published successfully");
  } else {
    console.log("Failed to publish the message");
  }
}

function handleStatus() {
  Shelly.call("Switch.GetStatus", {id:0}, function(result) {
    let output = result.ouput;
    publishMQTT(!output);
  })
}

Shelly.addEventHandler(function(event) {
  console.log(event.component);
  if (typeof event.component != "undefined" && event.component == BLUButtonClicked) {
    handleStatus();
    console.log("Handling status when button clicked...");
  }
});

Shelly.addStatusHandler(function(status) {
  console.log(status.component);
  if (typeof status.component != "undefined" && status.component == BLUMotionTriggered) {
    handleStatus();
    console.log("Handling status when motion triggered");
  }
});