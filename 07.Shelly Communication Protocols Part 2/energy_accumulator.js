let timeCounter = 0;
let energyAccumulator = 0;

Shelly.addStatusHandler(function(eventData){
  if (typeof eventData.component != "undefined" &&
      eventData.component === "switch:0") {
    if (typeof eventData.delta.aenergy != "undefined") {
      let energy = eventData.delta.aenergy.by_minute[0];
      energyAccumulator += energy;
      timeCounter++;
      console.log("Current accumulated energy:", energyAccumulator);
    }
    
    // check if switch is turned off and reset the counters
    if (eventData.delta.output === false) {
      console.log("Switch off, reseting counters");
      energyAccumulator = 0;
      timeCounter = 0;
      Shelly.call("Switch.ResetCounters", {id:0});
    }
  }
});

HTTPServer.registerEndpoint("energy_accumulator", function(request, response){
  let resp = {};
  if (request.method === "GET") {
    resp = {
      "time": timeCounter,
      "accumulated_energy": energyAccumulator
    }
  }
  if (request.method === "POST") {
    let req = JSON.parse(request.body);
    if (req.reset_counters === true) {
      console.log("Reseting counters by user request");
      timeCounter = 0;
      energyAccumulator = 0;
      Shelly.call("Switch.ResetCounters", {id:0});
      resp = {
        "result": "success"
      }
    }
  }

  response.code = 200;
  response.body = JSON.stringify(resp);
  response.headers = [["Content-type", "application/json"]];
  response.send();
});