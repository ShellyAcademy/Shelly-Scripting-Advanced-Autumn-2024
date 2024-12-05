const CONFIG = {
    MQTT_TOPIC: "home/room/motion",
    NO_MOTION_TIMEOUT: 5 * 1000
  }
  
  let timerHandle = -1;
  
  function startLightsTimer() {
    if (timerHandle !== -1) {
      Timer.clear(timerHandle);
    }
    timerHandle = Timer.set(CONFIG.NO_MOTION_TIMEOUT, false, function(){
      console.log("No motion, turning off lights");
      Shelly.call("Switch.Set", {id:0, on:false});
      timerHandle = -1;
    });
  }
  
  function mqtt_listener(topicName, message) {
    if (message === "detected") {
      console.log("Motion detected, turning on lights and starting timer");
      Shelly.call("Switch.Set", {id:0, on:true});
      startLightsTimer();
    }
  }
  
  MQTT.subscribe(CONFIG.MQTT_TOPIC, mqtt_listener)