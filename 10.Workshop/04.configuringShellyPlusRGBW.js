const VC_BUTTON = "bthomesensor:201";

const scenes = {
  Relax: {rgb: [0, 128, 255], brightnes: 50},
  Energy: {rgb: [255, 165, 0], brightness: 100},
  Party: {rgb: [255, 0, 255], brightness: 75}
};

Shelly.addEventHandler(function(eventData) {
  // console.log(JSON.stringify(eventData));
  if (typeof eventData != "undefined" && typeof eventData.component != "undefined" &&
    eventData.component === VC_BUTTON) {
      console.log("Hello!");
      let scene;
      if (eventData.info.event === "single_push") {
        scene = "Relax";
      } else if (eventData.info.event === "double_push") {
        scene = "Energy";
      } else if (eventData.info.event === "triple_push") {
        scene = "Party";
      }
      console.log("Scene:", scene);
      if (scene) {
        let settings = scenes[scene];
        Shelly.call("RGB.Set", {
          id: 0,
          rgb: settings.rgb,
          brightness: settings.brightness
        });
        
        console.log("Setting scene to " + scene);
      }
  }
})