const BLU_HT_TEMPERATURE = "bthomesensor:216";
let temperature = Shelly.getComponentStatus(BLU_HT_TEMPERATURE).value;

console.log("Current Temperature from BLU H&T is:", temperature, " Degrees");

if (temperature > 25) {
  Shelly.call("Switch.Set", {id: 0, on: false});
} else {
  Shelly.call("Switch.Set", {id: 0, on: true});
}