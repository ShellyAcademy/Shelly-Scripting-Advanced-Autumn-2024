let device = "Shelly Pro";
let deviceArray = device.split("")

//console.log(device)
//console.log(JSON.stringify(deviceArray))

let stack = []

while (deviceArray.length>0) {
  stack.push(deviceArray.pop());
}

result = stack.join("")
console.log(result);