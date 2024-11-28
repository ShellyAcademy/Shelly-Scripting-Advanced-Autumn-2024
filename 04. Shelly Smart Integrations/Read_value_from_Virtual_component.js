// get the value using asyn Boolean.GetStatus
Shelly.call("Boolean.GetStatus", {id:250}, function(result){
    let value = result.value;
    console.log("Async getstatus value:", value);
  });
  
  // get the value using sync call
  //let status = Shelly.getComponentStatus("boolean:250");
  //let value = status.value;
  let value = Shelly.getComponentStatus("boolean:250").value;
  console.log("Sync getstatus value:", value);