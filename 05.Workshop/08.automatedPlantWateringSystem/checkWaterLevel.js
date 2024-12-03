const THRESHOLD = 10;
const VC_LOW_WATER_LEVEL = "boolean:200";
const waterLevelVC = Virtual.getHandle(VC_LOW_WATER_LEVEL );

Shelly.addStatusHandler(function(status) {
  if (typeof status != "undefined" && status.component==="input:100") {
    let isLowLevel = waterLevelVC.getValue();
    // console.log("Is low water level:", isLowLevel);
    if (status.delta.percent < THRESHOLD) {
      console.log("Percent", status.delta.percent);
      if (!isLowLevel) {
        waterLevelVC.setValue(true);
        console.log("Turn off pump");
        Shelly.call("Switch.Set", {id: 0, on: false});
        // send notification
      }
    } else {
      waterLevelVC.setValue(false);
    }
  }
});