const TIMER_INTERVAL = 500;
const DIMMING_TIMER_INTERVAL = 5000;

let timer_handle = -1;
let dimming_timer_handle = -1;

function startRandomLights() {
  if (timer_handle !== -1) {
    // if timer is already running do not start new timer and return
    return;
  }
  timer_handle = Timer.set(TIMER_INTERVAL, true, function() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    
    Shelly.call("RGB.Set", {id:0, rgb:[red, green, blue]});
  })
}

function stopLights() {
  if (timer_handle !== -1) {
    Timer.clear(timer_handle);
    timer_handle = -1;
  }
}

function startDimming() {
  if (dimming_timer_handle !== -1) {
    return;
  }
  let ud = { dimming_up: true };
  dimming_timer_handle = Timer.set(DIMMING_TIMER_INTERVAL, true, function(ud){
    if (ud.dimming_up) {
      console.log("Dimming up");
      Shelly.call("RGB.DimUp", {id:0});
    } else {
      console.log("Dimming down");
      Shelly.call("RGB.DimDown", {id:0});
    }
    ud.dimming_up = !ud.dimming_up;
  }, ud);
}

Shelly.addEventHandler(function(eventData){
  if (typeof eventData.component != "undefined") {
    let component = eventData.component;
    let event = eventData.info.event;
    if (component === "input:0" && event === "single_push") {
      console.log("Toggling the state of the lights")
      Shelly.call("RGB.Toggle", {id:0});
    } else if (component === "input:1" && event==="single_push") {
      console.log("Starting random lights");
      startRandomLights();
    } else if (component === "input:1" && event==="double_push") {
      console.log("Stopping random lights");
      stopLights();
    } else if (component === "input:2" && event==="single_push") {
      startDimming();
    }
  }
})