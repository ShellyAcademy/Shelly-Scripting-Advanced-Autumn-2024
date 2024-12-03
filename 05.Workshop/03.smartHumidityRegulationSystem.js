const ABOVE_VALUE = 70;
const BEYOND_VALUE = 30;
const SHELLY_PLUG_IP = "192.168.10.235";

function turnOnPlug() {
  console.log("Turning on the plug...");
  let url = "http://" + SHELLY_PLUG_IP + "/rpc/Switch.Set?id=0&on=true";
  Shelly.call("HTTP.GET", {url: url}, function(result, error_code, error_message) {
    if (error_code == 0) {
      console.log("Successfully sent request.");
    }
  });
}

function turnOffPlug() {
  console.log("Turning off the plug...");
  let url = "http://" + SHELLY_PLUG_IP + "/rpc/Switch.Set?id=0&on=false";
  Shelly.call("HTTP.GET", {url: url}, function(result, error_code, error_message) {
    if (error_code == 0) {
      console.log("Successfully sent request.");
    }
  });
}

function setHumidityVCValue(humidity) {
  Shelly.call("Number.Set", {id: 202, value: humidity});
}

Shelly.addEventHandler(function(event) {
  // console.log(event);
  if (event.info.event == "analog_change") {
    let percentage = event.info.percent;
    if (percentage > ABOVE_VALUE) {
      turnOffPlug();
      setHumidityVCValue(percentage);
    } else if (percentage < BEYOND_VALUE) {
      turnOnPlug();
      setHumidityVCValue(percentage);
    }
  }
});