let CONFIG = {
    lampAction: "/myhome/lamp"
  };
  
  function lampMessageReceived(topic, message) {
    console.log("Topic:", topic);
    if (topic === CONFIG.lampAction) {
      let message = JSON.parse(message);
      console.log("Message:", message);
      if (message.message === "ON") {
        console.log("Turning switch on...");
        Shelly.call("Switch.Set", {id: 0, on: true});
      } else if (message.message === "OFF") {
        console.log("Turning switch off...");
        Shelly.call("Switch.Set", {id: 0, on: false});
      }
    }
  }
  
  MQTT.subscribe(CONFIG.lampAction, lampMessageReceived);