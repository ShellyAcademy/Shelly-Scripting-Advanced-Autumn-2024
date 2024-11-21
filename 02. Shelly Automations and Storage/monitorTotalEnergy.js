let ENERGY_THRESHOLD = 4;

// handle switch on event and reset the energy counters
Shelly.addEventHandler(function(eventData){
  if (typeof eventData.component != "undefined" && eventData.component === "switch:0") {
    if (eventData.info.event === "toggle" && eventData.info.state === true) {
      console.log("Switch turned on. Reseting energy counters")
      Shelly.call("Switch.ResetCounters", {id:0, type:["aenergy","ret_aenergy"]});
    }
  }
});

Shelly.addStatusHandler(function(eventData){
  if (typeof eventData.component != "undefined" && eventData.component === "switch:0" &&
      typeof eventData.delta.aenergy != "undefined") {
    total_energy = eventData.delta.aenergy.total;
    if (total_energy > ENERGY_THRESHOLD) {
      console.log("Energy threshold surpassed. Turning off the switch");
      Shelly.call("Switch.Set", {id:0, on:false});
    }
  }
});