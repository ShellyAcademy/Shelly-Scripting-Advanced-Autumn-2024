let CONFIG = {
    temperatureTopic: "/myhome/livingroom/temperature"
  };
  
  function temperatureMessageReceived(topic, message) {
    console.log("Topic:", topic);
    if (topic === CONFIG.temperatureTopic) {
      console.log("Message:", message);
      let result = JSON.parse(message);
      let temperature = result.temperature;
      console.log("Temperature is:", temperature, "Degrees");
      if (temperature >= 20) {
        Shelly.call("Switch.Set", {id: 0, on: false});
      } else {
        Shelly.call("Switch.Set", {id: 0, on: true});
      }
    }
  }
  
  MQTT.subscribe(CONFIG.temperatureTopic, temperatureMessageReceived);