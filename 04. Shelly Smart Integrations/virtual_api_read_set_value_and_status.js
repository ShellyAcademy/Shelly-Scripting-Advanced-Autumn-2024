const VC_TEMPERATURE="number:200"

const temperature_vc = Virtual.getHandle(VC_TEMPERATURE)

let value = temperature_vc.getValue()
console.log("Temperature is", value);

let newValue = 23;
temperature_vc.setValue(newValue);
// keep in mind setValue is an async call
// it is not guaranteed that value will change immediately
console.log("New value", temperature_vc.getValue());

let status = temperature_vc.getStatus();
console.log("status:", status);