schedule_params={
    "enable": true,
    "timespec": "*/10 * * * * *",
    "calls": [{
        "method": "Switch.Toggle",
        "params": {
          "id": 0
        }
      }
    ]
}

Shelly.call("Schedule.Create", schedule_params, function(result){
 console.log(result);
});