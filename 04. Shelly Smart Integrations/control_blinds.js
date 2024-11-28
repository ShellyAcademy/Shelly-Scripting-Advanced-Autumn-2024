const VC_BLINDS_CONTROL="enum:200"

const blinds = Virtual.getHandle(VC_BLINDS_CONTROL)

blinds.on("change", function(eventData){
  let value = eventData.value;
  if (value=="blinds_up") {
    Shelly.call("Cover.Open", {id:0});
  } else if (value=="blinds_down") {
    Shelly.call("Cover.Close", {id:0});
  }
});