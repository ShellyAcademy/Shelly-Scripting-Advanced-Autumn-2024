let url="http://192.168.10.245/test.htmll";

Shelly.call("HTTP.GET", {url: url, timeout: 5}, function(response, errorCode, errorMessage){
  console.log("Error code:", errorCode);
  console.log("Error message:", errorMessage);
  console.log("Response:", response);
  // to check for errors first check errorCode if 0 or negative(when there is error)
  // if errorCode is 0 check response.code for 200
  console.log("There was an error:", errorCode!==0 || response.code !== 200 )
});