function setRandomPlugColor() {
    let ledconfig = {
      "config": {
        "leds": {
          "colors": {
            "switch:0": {
              "on": {
                "rgb": [
                  Math.round(Math.random() * 100),
                  Math.round(Math.random() * 100),
                  Math.round(Math.random() * 100)
                ]
              }
            }
          }
        }
      }
    }
    Shelly.call("PLUGS_UI.SetConfig", ledconfig);
  }
  
  Shelly.addEventHandler(function(eventData){
    if (eventData.info.event === "BLU_BUTTON") {
      let data = eventData.info.data;
      if (data.Button === 1) {
        console.log("Button 1 pressed, toggling switch.");
        Shelly.call("Switch.Toggle", {id:0});
      }
      if (data.Button === 2) {
        console.log("Button 2 pressed, setting random color.");
        setRandomPlugColor();
      }
    } 
  });