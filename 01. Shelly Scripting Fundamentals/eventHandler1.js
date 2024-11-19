function eventHandler(eventData, userData) {
    //console.log(JSON.stringify(eventData));
    //console.log(JSON.stringify(userData));
    if (eventData.component != "undefined" &&
        eventData.component === "switch:0" && eventData.info.event === "toggle") {
      if (eventData.info.state) {
        console.log("Switch is on")
      } else {
        console.log("Switch is off")
      }
    }
  }
  
  Shelly.addEventHandler(eventHandler, {"info": "event information"});