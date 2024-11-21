Shelly.call("Schedule.Create", {
    enable: true,
    timespec: "0 7 21 * * *",
    calls: [
      {
        method: "Switch.Set",
        params: {
          id: 0,
          on: true
        }
      }
    ]
  });
  
  Shelly.addEventHandler(function(eventData){
    if (typeof eventData.component != "undefined" && eventData.component === "switch:0" &&
        eventData.info.event === "toggle" && eventData.info.state === true) {
      console.log("Boiler on, start turn off timer for 1 hour.")
      Timer.set(
        60 * 60 * 1000, // 1 hour = 60 * 60 * 1000
        false,
        function(){
          Shelly.call("Switch.Set", {id:0, on:false});
        });
    }
  });