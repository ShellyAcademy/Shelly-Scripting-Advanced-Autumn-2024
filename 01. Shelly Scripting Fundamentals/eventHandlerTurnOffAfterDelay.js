th = -1;

function handle_switch_events(eventData) {
  if (eventData.component != "undefined" &&
      eventData.component === "switch:0" && eventData.info.event === "toggle") {
    if (eventData.info.state) {
      console.log("Switch was turned on. Starting timer!");
      if (th != -1) {
        Timer.clear(th);
      }
      th = Timer.set(
         10000, // 1 hour = 60 * 60 * 1000
         false,
         function() {
           console.log("Timer is over. Turning off the switch");
           Shelly.call("Switch.Set", {id:0, on:false});
           th = -1;
         }
      )      
    }
  }
}
Shelly.addEventHandler(handle_switch_events)