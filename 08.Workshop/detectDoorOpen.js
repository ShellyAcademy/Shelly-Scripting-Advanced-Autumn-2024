const doorSensorOpen = "bthomesensor:204";
const doorSensorIlluminance = "bthomesensor:203";
const doorSensorRotation = "bthomesensor:205";

Shelly.addStatusHandler(function(status) {
  if (typeof status.component != "undefined") {
    // console.log(JSON.stringify(status));
    if (status.component == doorSensorOpen) {
      let isDoorOpen = status.delta.value;
      console.log("Door is open?:", isDoorOpen);
      if (isDoorOpen) {
        let illuminance = Shelly.getComponentStatus(doorSensorIlluminance).value;
        console.log("Door was open and illuminance is:", illuminance, "lux");
      }
    } else if (status.component == doorSensorRotation && typeof status.delta.value != "undefined") {
      let degrees = status.delta.value;
      console.log("Door rotated with", degrees, "degrees.");
    }
  }
});