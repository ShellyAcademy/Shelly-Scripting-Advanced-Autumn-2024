const MOTION_COMPONENT = "bthomesensor:200";

function sendNotification(title, message) {
  const url = "https://alertzy.app/send";
  let data = {
    "accountKey": "<account-key>",
    "title": title,
    "message": message
  }
  Shelly.call("HTTP.POST", {url:url, body:JSON.stringify(data)}, function(response, error_code){
    if (error_code===0) {
      if (response.code===200) {
        let body = JSON.parse(response.body);
        if (body.response === "success") {
          console.log("Notification sent successfully");
        }
      }
    }
  });
}

Shelly.addStatusHandler(function(eventData){
  if (eventData.component === MOTION_COMPONENT && typeof  eventData.delta.value != "undefined") {
    let motion = eventData.delta.value;
    if (motion) {
      sendNotification("Motion detected", "Motion is detected in the living room!");
    } else {
      sendNotification("Motion detected", "No motion any more!");
    }
  }
});

//sendNotification("test", "test message");