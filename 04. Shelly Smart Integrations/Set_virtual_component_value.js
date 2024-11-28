let newValue = true;

// Setting values of virtual components is only async operation
Shelly.call("Boolean.Set", {id:250, value:newValue}, function(result) {
  console.log("Value of boolean was changed");
  console.log("New value:", Shelly.getComponentStatus("boolean:250").value);
});
// if you read the value immediately after calling <component>.Set it is 
// not guaranteed that the value will be changed
console.log(Shelly.getComponentStatus("boolean:250").value);