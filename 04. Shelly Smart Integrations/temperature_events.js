Shelly.addEventHandler(function(eventData){
    if (typeof eventData.component != "undefined" &&
        eventData.component === "temperature:100") {
      console.log(JSON.stringify(eventData))
    }
  })