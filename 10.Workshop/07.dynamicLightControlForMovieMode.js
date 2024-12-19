const VC_LIGHTS_CONTROL = "button:200";
const MOVIE_BRIGHTNESS = 20;
const NO_MOVIE_BRIGHTNESS = 80;
const DIMMER_URLS = ["http://192.168.10.200/rpc/Light.Set?id=0", "http://192.168.10.147/rpc/Light.Set?id=0"];

let lightControl = Virtual.getHandle(VC_LIGHTS_CONTROL);

function setLightBrightness(brightness) {
  Shelly.call("RGB.Set", {id: 0, brightness: brightness});
  for (let url of DIMMER_URLS) {
    let dimmerUrl = url + "&on=true&brightness=" + brightness;
    console.log(dimmerUrl);
    Shelly.call("HTTP.GET", {url: dimmerUrl});
  }
}

lightControl.on("single_push", function(e) {
  setLightBrightness(MOVIE_BRIGHTNESS);
});

lightControl.on("double_push", function(e) {
  setLightBrightness(NO_MOVIE_BRIGHTNESS);
});