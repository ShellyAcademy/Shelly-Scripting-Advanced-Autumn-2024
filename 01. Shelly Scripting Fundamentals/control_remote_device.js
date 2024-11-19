Shelly.addEventHandler(function(eventData){
  if (eventData.component != "undefined" &&
      eventData.component === "switch:0" && eventData.info.event === "toggle") {
    let isOn = eventData.info.state;
    console.log("Switch state:", isOn);
    // construct the url to turn on/off the remote switch
    let url = "http://192.168.104.188/rpc/Switch.Set?id=0&on=" + isOn;
    Shelly.call("HTTP.GET", {url: url});
  }
});