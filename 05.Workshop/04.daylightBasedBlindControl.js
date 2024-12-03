const COVER_THRESHOLD = 20;
const IS_DAY_VC = "boolean:200";
let isDay = Virtual.getHandle(IS_DAY_VC);

console.log("Hello World!");

function isCoverOpening() {
  let state = Shelly.getComponentStatus("cover:0").state;
  console.log("State", state);
  return state == "opening" || state == "closing" || state == "calibrating";
}

// isCoverOpening();


function controlBlind(valueToSet) {
  let isDayValue = Shelly.getComponentStatus("boolean:200");
  
  let coverPositionValue = Shelly.getComponentStatus("cover:0").current_pos;
  console.log("Current Position:", coverPositionValue);
  console.log("Next Position:", valueToSet);
  
  let difference = Math.abs(valueToSet - coverPositionValue);
  console.log("Difference:", difference);
  let isOperating = isCoverOpening();
  console.log("IS DAY VALUE:", isDayValue);
  if (!isDayValue) {
    valueToSet = 100;
  }
  if (valueToSet != coverPositionValue && difference > COVER_THRESHOLD && !isOperating) {
    Shelly.call("Cover.GoToPosition", {id: 0, pos: valueToSet});
    console.log("Setting Blind to", valueToSet, "%");
  }
}

Shelly.addStatusHandler(function(status) {
  if (typeof status.component != "undefined" && status.component == "input:100") {
    if (status.delta.percent) {
      let percent = status.delta.percent;
      console.log(percent);
      let valueToSet = Math.floor(100 - percent);
      controlBlind(valueToSet);
    }
  }
});