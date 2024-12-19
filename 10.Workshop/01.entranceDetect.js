const CONFIG = {
    MOTION_VC: "bthomesensor:204",
    DOOR_VC: "bthomesensor:207",
    TEMPERATURE_VC: "bthomesensor:211",
    HUMIDITY_VC: "bthomesensor:210",
    
    MESSAGE_VC_ID: 200,
    SPEAK_VC_ID: 201,
    
    BRIGHTNESS: 30,
    DIMMER_URLS: ["http://192.168.10.147/rpc/Light.Set?id=0", "http://192.168.10.200/rpc/Light.Set?id=0"]
  };
  
  
  function setLightBrightness(brightness, on) {
    Shelly.call("RGB.Set", {id: 0, on: on, brightness: brightness});
    for (url of CONFIG.DIMMER_URLS) {
      let dimmerUrl = url + "&on=" + on + "&brightness=" + brightness;
      Shelly.call("HTTP.GET", {url: dimmerUrl}); 
    }
  }
  
  // setLightBrightness(50, true);
  
  function turnLightOn() {
    setLightBrightness(CONFIG.BRIGHTNESS, true);
  }
  
  function turnLightOff() {
    setLightBrightness(CONFIG.BRIGHTNESS, false);
  }
  
  function playMessage(message) {
    Shelly.call("Text.Set", {id: CONFIG.MESSAGE_VC_ID, value: message}, function() {
      Shelly.call("Button.Trigger", {id: CONFIG.SPEAK_VC_ID, event: "single_push"});
    });
  }
  
  function playWelcomeMessage() {
    let temperature = Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC).value;
    let humidity = Shelly.getComponentStatus(CONFIG.HUMIDITY_VC).value;
    let welcomeMessage = "Welcome home! The temperature is " + temperature + "degrees and humidity is " + humidity + "%";
    playMessage(welcomeMessage);
  }
  
  function playGoodByeMessage() {
    let goodByeMessage = "Good bye, see you soon!";
    playMessage(goodByeMessage);
  }
  
  Shelly.addStatusHandler(function(eventData) {
    // console.log(JSON.stringify(eventData));
    if (typeof eventData != "undefined" && typeof eventData.component != "undefined" && 
    eventData.component === CONFIG.DOOR_VC && typeof eventData.delta.value != "undefined") {
      let isOpen = eventData.delta.value;
      if (isOpen) {
        console.log("Door is Open");
        let motion = Shelly.getComponentStatus(CONFIG.MOTION_VC).value;
        if (motion) {
          turnLightOn();
          playWelcomeMessage();
        } else {
          playGoodByeMessage();
          turnLightOff();
        }
      }
    }
  });