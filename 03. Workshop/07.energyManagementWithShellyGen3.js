let CONFIG = {
    KVS_KEY: "Script-Schedule-" + Shelly.getCurrentScriptId(),
    SCHEDULE_TIMESPEC: "0 1 0 * * *",
    SCHEDULE_ID: -1,
    CALLBACK: "resetPower()",
    MAX_THRESHOLD: 100,
    MAX_DAILY_KEY: "max_daily_energy"
  };
  
  function registerIfNotRegistered() {
    Shelly.call("KVS.Get", {key: CONFIG.KVS_KEY}, function(result, error_code, error_message) {
      if (error_code != 0) {
        // KVS KEY DOES NOT EXIST
        console.log("Schedule not created yet: Install schedule.");
        installSchedule();
        return;
      }
      CONFIG.SCHEDULE_ID = result.value;
      console.log("Schedule with ID", CONFIG.SCHEDULE_ID, "already created!");
      // chech if the schedule still exists
      // if not exists, install it
      Shelly.call("Schedule.List", {}, function(result) {
        for (let i = 0; i < result.jobs.length; i++) {
          if (result.jobs[i].id ===  CONFIG.SCHEDULE_ID) return;
        }
        console.log("Schedule ID", CONFIG.SCHEDULE_ID, " not found. Installing new schedule");
        installSchedule();
      });
    });
  }
  
  function saveScheduleIDInKVS(scheduleId) {
    Shelly.call("KVS.Set", {
      key: CONFIG.KVS_KEY,
      value: scheduleId
    });
  }
  
  function installSchedule() {
    Shelly.call("Schedule.Create", {
      enable: true,
      timespec: CONFIG.SCHEDULE_TIMESPEC,
      calls: [
        {
          method: "script.eval",
          params: {
            id: Shelly.getCurrentScriptId(),
            code: CONFIG.CALLBACK,
          },
        },
      ],
    }, function(result) {
      CONFIG.SCHEDULE_ID = result.id;
      console.log("New schedule with ID", CONFIG.SCHEDULE_ID, " installed.");
      saveScheduleIDInKVS(result.id);
    })
  }
  
  // Task which will be run on a schedule
  function resetPower() {
    Shelly.call("Switch.ResetCounters", {id: 0, type: ["aenergy"]});
  }
  
  function storeInKVS() {
    Shelly.call("KVS.Set", {key: CONFIG.MAX_DAILY_KEY, value: CONFIG.MAX_THRESHOLD});
  };
  
  storeInKVS();
  registerIfNotRegistered();
  
  Shelly.addEventHandler(function(event) {
    // console.log(JSON.stringify(event));
    if (typeof event.component != "undefined" && event.component == "switch:0") {
      console.log("Switch component!");
      if (event.info.event == "toggle" && typeof event.info.state != "undefined") {
        let state = event.info.state;
        let event = event.info.event;
        if (event == "toggle" && state == true) {
          Shelly.call("KVS.Get", {key: CONFIG.MAX_DAILY_KEY}, function(result, error_code, error_message) {
            if (error_code == 0) {
              let value = result.value;
              console.log("Threshold value which comes from KVS is:", value);
              Shelly.call("Switch.GetStatus", {id: 0}, function(result) {
                let total = result.aenergy.total;
                console.log("Current total energy consumption is:", total);
                if (total > value) {
                  console.log("Turning OFF the Switch...");
                  Shelly.call("Switch.Set", {id: 0, on: false});
                }
              });
            }
          });
        }
      }
    }
  });