let my_url="http://192.168.10.112/rpc/Sys.SetConfig";
let my_body={
  "config": {
    "location": {
      "tz": "Europe/Sofia"
    }
  }
}

// for HTTP.Request we need to provide the method = POST
Shelly.call("HTTP.Request", {method:"POST", url: my_url, body: my_body}, function(response, errorCode, errorMessage) {
  console.log("Error code:", errorCode);
  console.log("Error message:", errorMessage);
  console.log("Response:", JSON.stringify(response));
  // response.body will be a string and needs to parsed to JavaScript object before used as such
  // we cannot use the body directly because it is a string
  // this is wrong
  //console.log(response.body.restart_required);

  // we convert the string to json object with JSON.parse(str)
  let result_json = JSON.parse(response.body);
  console.log("Restart required:", result_json.restart_required);
});