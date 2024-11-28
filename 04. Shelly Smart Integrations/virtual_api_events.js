const VC_TEMPERATURE = "number:200"
const VC_BUTTON = "button:200"

const temperature_vc = Virtual.getHandle(VC_TEMPERATURE);
const button_vc = Virtual.getHandle(VC_BUTTON);

tempreature_vc.on("change", function(eventData){
  let newValue = eventData.value;
  console.log("New temperature is", newValue, "C");
});

button_vc.on("single_push", function(eventData){
  console.log("Button was pushed");
});

button_vc.on("double_push", function(eventData){
  console.log("Button was double pushed");
});