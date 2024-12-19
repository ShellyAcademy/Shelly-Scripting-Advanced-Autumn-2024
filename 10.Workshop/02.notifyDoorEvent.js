const ALERTZY_API_KEY = "";
const HA_TOKEN = "";
const HA_NOTIFY_URL = "http://192.168.10.153:8123/api/services/notify/mobile_app_redmi_note_5";
const MONGO_SERVER_URL = "http://192.168.10.119:8080";
const VC_DOOR_SENSOR = "bthomesensor:207";

function sendNotificationAlertzy(title, message) {
  const url = "https://alertzy.app/send";
  let data = {
    "accountKey": ALERTZY_API_KEY,
    "title": title,
    "message": message
  };
  console.log("Sending", message, "to Alertzy");
  Shelly.call("HTTP.POST", {url: url, body: JSON.stringify(data)}, function(response, error_code) {
    if (error_code === 0) {
      if (response.code === 200) {
        let body = JSON.parse(response.body);
        if (body.response === "success") {
          console.log("Notification sent successfully to Alertzy.");
        }
      }
    }
  });
}

function sendNotificationHA(title, message) {
  let request = {
    "title": title,
    "message": message
  };
  
  let headers = {
    "Authorization": "Bearer " + HA_TOKEN
  };
  
  console.log("Sending", message, "to HA");
  Shelly.call("HTTP.Request", {url: HA_NOTIFY_URL, method: "POST", headers: headers, body: request}, 
  function(response, error_code) {
    if (error_code === 0 && response.code === 200) {
      console.log("Notification sent successfully to HA");
    }
  });
}

function logEvent(message, type) {
  let request = {
    event_type: type,
    event_text: message
  };
  let url = MONGO_SERVER_URL + "/eventLog";
  Shelly.call("HTTP.POST", {url: url, body: JSON.stringify(request)});
}

Shelly.addStatusHandler(function(eventData) {
  if (typeof eventData != "undefined" && typeof eventData.component != "undefined" && 
  eventData.component === VC_DOOR_SENSOR) {
    let door = eventData.delta.value;
    console.log("Door is open?", door);
    if (door) {
      var title = "Door event";
      var message = "Front door opened";
    } else {
      var title = "Door event";
      var message = "Front door closed";
    }
    sendNotificationAlertzy(title, message);
    sendNotificationHA(title, message);
    logEvent(message, "door_event");
  }
});