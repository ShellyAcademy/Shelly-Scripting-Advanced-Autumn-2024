// This script registers an endpoint which receives data from H&T device. Based on the temperature it sends MQTT messages and controls other devices
let topic = "/myhome/livingroom/temperature";
let message;
let result;

function parseQueryString(queryString) {
  let queryParams = {};
  queryString = queryString.charAt(0) === "?" ? queryString.substring(1) : queryString;
  let pairs = queryString.split("&");
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    let key = pair[0];
    let value = pair[1];
    queryParams[key] = value;
  }
  return queryParams;
}

HTTPServer.registerEndpoint("temperature", function(request, response) {
  if (request.method === "GET") {
    let queryParams = parseQueryString(request.query);
    response.headers = [["Content-Type", "text/plan"]];
    console.log(queryParams);
    let temperature = queryParams.temperature;
    if (temperature > 10) {
      message = JSON.stringify({temperature: temperature, unit: "Celsius"});
      result = MQTT.publish(topic, message);
      if (result) {
        console.log(result);
        console.log("Message published successfully");
      } else {
        console.log("Failed to publish the message. Check MQTT connection");
      }
    }
  }
})