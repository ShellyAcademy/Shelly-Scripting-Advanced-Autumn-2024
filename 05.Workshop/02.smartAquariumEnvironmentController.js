// console.log("Hello World!");
const SENSOR_TEMPERATURE_VC = "number:200";
const HT_TEMPERATURE_VC = "number:201";
const THRESHOLD = 10;

Shelly.addStatusHandler(function(status) {
  console.log(JSON.stringify(status));
  if (status.component == "temperature:100") {
    if (typeof status.delta.tC != "undefined") {
      let currentTemperature = status.delta.tC;
      console.log("Current Temperature is:", currentTemperature);
      
      let sensorValue = Shelly.getComponentStatus("number:200").value;
      let HTValue = Shelly.getComponentStatus("number:201").value;
      
      let tempDifference = sensorValue - HTValue;
      console.log("Difference", tempDifference);
      if (tempDifference > THRESHOLD) {
        Shelly.call("Switch.Set", {id: 0, on: false});
        console.log("Turning off the switch...");
      }
      
      Shelly.call("Number.Set", {id: 200, value: currentTemperature}, function(result) {
        console.log(result);
      });
    }
  }
});