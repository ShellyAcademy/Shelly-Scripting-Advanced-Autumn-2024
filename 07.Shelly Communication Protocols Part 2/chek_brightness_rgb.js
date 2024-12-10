Shelly.addEventHandler(function(e){
    if (typeof e.info != "undefined" && e.info.event === "EXTERNAL_EVENT" &&
        e.info.data.event_type==="status" && e.info.data.src === "shellyprorgbwwpm-ac1518784c54") {
      let delta = e.info.data.delta;
      let newBrightness = delta.brightness;
      console.log("setting brightness to:", newBrightness);
      let letconfig = {
        "config": {
          "leds": {
            "colors": {
              "switch:0": {
                "on": {
                  "brightness": newBrightness
                }
              }
            }
          }
        }
      }
      Shelly.call("PLUGS_UI.SetConfig", ledconfig);
    }
  });