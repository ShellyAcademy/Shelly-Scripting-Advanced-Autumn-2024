const OTHER_DEVICE_MQTT_TOPIC="shellyplusrgbwpm-a0a3b35c70ac/rpc";
const SUBCRIBE_TOPIC="shelly_plug/rpc";

const RPC_CMD={
  "id": 0,
  "src": "shelly_plug",
  "method": "rgb.set",
  "params": {
    "id": 0,
    "brightness": 100,
    "rgb": [255,0,0],
    "on": true
  }
}

MQTT.subscribe(SUBCRIBE_TOPIC, function(topicName, message) {
  let jsonMessage = JSON.parse(message)
  console.log(jsonMessage);
});

MQTT.publish(OTHER_DEVICE_MQTT_TOPIC, JSON.stringify(RPC_CMD));