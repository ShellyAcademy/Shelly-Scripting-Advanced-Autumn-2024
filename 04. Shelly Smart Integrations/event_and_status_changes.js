Shelly.addEventHandler(function(eventData){
    if (typeof eventData.component != "undefined" &&
        eventData.component === "button:200") { 
      console.log(JSON.stringify(eventData));
    }
  })
  
  Shelly.addStatusHandler(function(eventData){
    if (typeof eventData.component != "undefined" &&
        eventData.component === "number:202") {
      console.log(JSON.stringify(eventData));
    }
  })