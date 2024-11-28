const VC_LIGHTS_CONTROL="boolean:200"
const VC_BRIGHTNESS="number:202"
const VC_TEMP="number:203"

const lights_control_vc = Virtual.getHandle(VC_LIGHTS_CONTROL);
const brightness_vc = Virtual.getHandle(VC_BRIGHTNESS);
const temp_vc = Virtual.getHandle(VC_TEMP);

let baseUrl = "http://192.168.10.182/light/0";

lights_control_vc.on("change", function(eventData){
  let value = eventData.value;
  if (value)
    onoff = "on"
  else 
    onoff = "off"
  let url = baseUrl + "?turn=" + onoff
  Shelly.call("HTTP.GET", {url:url});
});

brightness_vc.on("change", function(eventData){
  let value = eventData.value;
  let url = baseUrl + "?brightness=" + value;
  Shelly.call("HTTP.GET", {url:url});
});

temp_vc.on("change", function(eventData){
  let value = eventData.value;
  let url = baseUrl + "?temp=" + value;
  Shelly.call("HTTP.GET", {url:url});
});