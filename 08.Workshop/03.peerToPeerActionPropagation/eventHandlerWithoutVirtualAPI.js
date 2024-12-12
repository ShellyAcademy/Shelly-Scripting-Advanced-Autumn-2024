Shelly.addStatusHandler(function(status) {
    // console.log(JSON.stringify(status));
    if (typeof status.component != "undefined") {
      console.log(typeof status);
      console.log(JSON.stringify(status));
      if (status.component == "text:200") {
        let event = JSON.parse(status.delta.value).event;
        console.log("Event:", event);
        if (event === "single_push") {
          Shelly.call("Switch.Set", {id: 0, on: true})
        } else if (event === "double_push") {
          Shelly.call("Switch.Set", {id: 0, on: false});
        }
      }
    }
  });