Shelly.addEventHandler(function(eventData){
    if (typeof eventData.component != "undefined" && eventData.component==="input:100")
       console.log("Event", JSON.stringify(eventData))
  })
  
  Shelly.addStatusHandler(function(e){
    if (typeof e.component != "undefined" && e.component==="input:100")
       console.log("Status change", JSON.stringify(e))
  })