let CONFIG = {
    BUTTON_CLICKED: "bthomesensor:201",
    MOTION_TRIGGERED: "bthomesensor:208",
    DOOR_WINDOW_TRIGGERED: "bthomesensor:204",
    PLUG_GEN_3_1_DESTINATION: "shellyplugsg3-3030f9ed6b30",
    PLUG_GEN_3_2_DESTINATION: "shellyplugsg3-3030f9eaa9d0",
    PLUG_S_DESTINATION: "shellyplusplugs-80646fceadd4"
  };
  
  function emitDeviceEvent(dst) {
    Shelly.emitEvent("TOGGLE", {dst: dst, id: 0});
  }
  
  Shelly.addEventHandler(function(event) {
    if (typeof event.component != "undefined" && event.component == CONFIG.BUTTON_CLICKED) {
      console.log("Button Clicked!");
      if (event.info.event == "long_push") {
        emitDeviceEvent(CONFIG.PLUG_GEN_3_1_DESTINATION);
        emitDeviceEvent(CONFIG.PLUG_S_DESTINATION);
        emitDeviceEvent(CONFIG.PLUG_GEN_3_2_DESTINATION);
      }
    }
  });
  
  
  Shelly.addStatusHandler(function(status) {
    if (typeof status.component != "undefined" && status.component == CONFIG.MOTION_TRIGGERED) {
      console.log("Motion triggered!");
      emitDeviceEvent(CONFIG.PLUG_GEN_3_2_DESTINATION);
    } else if (typeof status.component != "undefined" && status.component == CONFIG.DOOR_WINDOW_TRIGGERED) {
      console.log("Door&Window triggered!");
      emitDeviceEvent(CONFIG.PLUG_S_DESTINATION);
    }
  });
  