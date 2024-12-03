const THRESHOLD = 20;
const VC_SOIL_HUMIDITY = "number:200";
const PUMP_ON_ID = 200;
const PUMP_OFF_ID = 201;

const soilHumidity = Virtual.getHandle(VC_SOIL_HUMIDITY);

soilHumidity.on("change", function(event) {
  let humidity = event.value;
  let isPumpOn = Shelly.getComponentStatus("switch:0").output;
  if (humidity < THRESHOLD) {
    if (!isPumpOn) {
      // if humidity is  too low and the pump is off, turn it on...
      console.log("Turning on the Pump...");
      Shelly.call("Button.Trigger", {id: PUMP_ON_ID, event: "single_push"});
    } else {
      if (isPumpOn) {
        // if humidity is high and pump is on, turn it off...
        Shelly.call("Button.Trigger", {id: PUMP_OFF_ID, event: "single_push"});
      }
    }
  }
});