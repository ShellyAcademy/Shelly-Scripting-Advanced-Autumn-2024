let url = "https://reqbin.com/echo/put/json"

let request={
  lat: 42,
  lon: 24,
  query: "temperature"
}

Shelly.call("HTTP.Request", {method:"PUT", url: url, body:request}, function(response, errorCode, errorMessage){
  console.log(response);
});