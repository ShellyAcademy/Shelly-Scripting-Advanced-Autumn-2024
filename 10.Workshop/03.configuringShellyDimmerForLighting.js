const VC_MOTION = "bthomesensor:202";
const VC_ILLUMINANCE = "bthomesensor:201";
const DEVICES_URLS = ["http://192.168.10.147/rpc/Light.Set?id=0&on=true&brightness=", "http://192.168.10.185/rpc/RGB.Set?id=0&on=true&brightness="];

Shelly.addStatusHandler(function(eventData) {
  // console.log(JSON.stringify(eventData));
  if (typeof eventData != "undefined" && typeof eventData.component != "undefined" && 
  eventData.component == VC_MOTION) {
    let illuminance = Shelly.getComponentStatus(VC_ILLUMINANCE).value;
    console.log("Illuminance:", illuminance);
    let brightness;
    if (illuminance < 50) {
      brightness = 50;
    } else {
      brightness = 100;
    }
    console.log("Setting light to", brightness, "%");
    Shelly.call("Light.Set", {id: 0, brightness: brightness});
    for (let i = 0; i < DEVICES_URLS.length; i++) {
      let url = DEVICES_URLS[i] + brightness;
      Shelly.call("HTTP.GET", {url: url});
    }
  }  
});