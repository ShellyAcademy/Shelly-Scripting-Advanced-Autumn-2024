const EVENTS_TOPIC="shellyplusrgbwpm-a0a3b35c70ac/events/rpc";

function handle_events(topicName, message) {
  let event = JSON.parse(message);
  if (event.method==="NotifyEvent") {
    for (e of event.params.events) {
      console.log(e.event);
      if (e.component==="input:2" && e.event==="btn_down") {
        console.log("Butten pressed, toggling the switch");
        Shelly.call("Switch.Toggle", {id:0});
      }
    }
  }
}

MQTT.subscribe(EVENTS_TOPIC, handle_events)