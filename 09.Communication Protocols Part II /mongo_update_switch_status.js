const UPDATE_PERIOD_THRESHOLD = 1000; // 1 second

const base_url = "http://192.168.10.118:8080/switch";
const device_info = Shelly.getDeviceInfo();
const device_id = device_info.id;

function updateSwitch(switch_id, output, voltage, apower) {
  let data = {
    device_id: device_id,
    switch_id: switch_id,
    output: output,
    voltage: voltage,
    apower: apower
  }
  let request = {
    url: base_url + "/" + data.device_id + "/" + data.switch_id,
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  Shelly.call("HTTP.Request", request, function(response, error_code, error_message) {
    if (error_code == 0) {
      console.log("Success:", response.body);
    } else {
      console.log("Error:", error_message);
    }
  });
}

let last_update_ts = Date.now() - UPDATE_PERIOD_THRESHOLD;

Shelly.addStatusHandler(function(eventData){
  if (eventData.component.substr(0, 6) === "switch") {
    let ts_now = Date.now();
    if (ts_now - last_update_ts > UPDATE_PERIOD_THRESHOLD) {
      last_update_ts = ts_now;

      let switchStatus = Shelly.getComponentStatus(eventData.component);
      console.log("New status update for", eventData.component);
      updateSwitch(switchStatus.id, switchStatus.output, switchStatus.voltage, switchStatus.apower);
    }
  }
});