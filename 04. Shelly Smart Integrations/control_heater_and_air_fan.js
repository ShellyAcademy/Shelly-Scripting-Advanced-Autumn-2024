const VC_TEMPERATURE="number:200";
const VC_HUMIDITY="number:201";

const TEMPERATURE_THRESHOLD = 18;
const HUMIDITY_THRESHOLD = 50;

const temperature_vc = Virtual.getHandle(VC_TEMPERATURE);
const humidity_vc = Virtual.getHandle(VC_HUMIDITY);

let heater_on = false;
let fan_on = false;

temperature_vc.on("change", function(eventData){
  let temperature=eventData.value;

  if (temperature <= TEMPERATURE_THRESHOLD) {
    if (!heater_on) {
      Shelly.call("Switch.Set", {id:0, on: true});
      heater_on = true;
    }
  } else if (heater_on) {
    Shelly.call("Switch.Set", {id:0, on: false});
    heater_on = false;
  }
});

humidity_vc.on("change", function(eventData){
  let humidity = eventData.value;
  
  if (humidity > HUMIDITY_THRESHOLD) {
    if (!fan_on) {
      Shelly.call("Switch.Set", {id:1, on:true});
      fan_on=true;
    }
  } else if (fan_on) {
    Shelly.call("Switch.Set", {id:1, on:false});
    fan_on=false;
  }
});