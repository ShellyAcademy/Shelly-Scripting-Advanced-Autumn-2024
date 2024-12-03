const PUMP_ON_VC = "button:200";
const PUMP_OFF_VC = "button:201";
const LOW_WATER_LEVEL_VC = "boolean:200";


const lowWaterLevel = Virtual.getHandle(LOW_WATER_LEVEL_VC);
const pumpOn = Virtual.getHandle(PUMP_ON_VC);
const pumpOff = Virtual.getHandle(PUMP_OFF_VC);

pumpOn.on("single_push", function(v) {
  console.log("Single push");
  let isLowLevel = lowWaterLevel.getValue();
  if (!isLowLevel) {
    console.log("Turning on the pump...");
    // If water level is OK, turn on the pump
    Shelly.call("Switch.Set", {id: 0, on: true});
  }
});

pumpOff.on("single_push", function(v) {
  // turn off the pump
  console.log("Turning off the pump...");
  Shelly.call("Switch.Set", {id: 0, on: false});
})