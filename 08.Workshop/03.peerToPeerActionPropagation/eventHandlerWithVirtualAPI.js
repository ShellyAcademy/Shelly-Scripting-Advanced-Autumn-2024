let textVC = Virtual.getHandle("text:200");

textVC.on("change", function(ev_info) {
   event = JSON.parse(ev_info.value).event;
   console.log(event);
   if (event === "single_push") {
     Shelly.call("Switch.Set", {id: 0, on: true});
   } else if (event === "double_push") {
     Shelly.call("Switch.Set", {id: 0, on: false});
   }
})