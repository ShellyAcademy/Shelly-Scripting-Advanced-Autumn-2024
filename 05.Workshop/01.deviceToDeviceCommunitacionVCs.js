const SHELLY_PLUG_IP = "192.168.10.235";
const TEMPERATURE_VC = "number:200";

Shelly.addStatusHandler(function(status) {
  console.log(JSON.stringify(status));
  if (status.component == "temperature:100") {
    if (typeof status.delta.tC != "undefined") {
      let lastTemp = Virtual.getHandle(TEMPERATURE_VC);
      // let lastTempValue = Number(lastTemp.getValue());
      let lastTempValue = Shelly.getComponentStatus("number:200").value;
      let tempCelsius = status.delta.tC;
      
      if (tempCelsius != lastTempValue) {
        // lastTemp.setValue(tempCelsius);
        Shelly.call("Number.Set", {id:200, value:tempCelsius});
        let plugURL = "http://" + SHELLY_PLUG_IP + "/rpc/Number.Set?id=200&value=" + tempCelsius;
        Shelly.call("HTTP.GET", {url: plugURL}, function(result, error_code, error_message) {
          if (error_code == 0) {
            console.log("Successfully changed the Plug temperature to", tempCelsius, "Celsius degrees");
          } else {
            console.log("There was an error sending the request", error_message);
          }
        });
      }  
    }
  }
});