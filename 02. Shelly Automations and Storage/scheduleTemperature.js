function getTemperature() {
    let url = "https://api.open-meteo.com/v1/forecast?latitude=42.14&longitude=24.75&current=temperature_2m";
    Shelly.call("HTTP.GET", {url:url}, function(result){
      let response = JSON.parse(result.body);
      let temperature = response.current.temperature_2m;
      console.log("Current temperature is", temperature);
    });
  }
  
  schedule_params = {
      enable: true, // Enable this schedule
      timespec: "*/10 * * * * *", // Every two hours
      calls: [
        {
          method: "script.eval",
          params: {
            id: Shelly.getCurrentScriptId(),
            code: "getTemperature()",
          },
        },
      ],
    }
  
  Shelly.call("Schedule.Create", schedule_params, function(result){
    console.log("schedule created:", result);
  });