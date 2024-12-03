const BRIGHTNESS_VC = "number:202";
const DIMMER_URLS = ["http://192.168.10.200/rpc/Light.Set?id=0&on=true&brightness=", "http://192.168.10.147/rpc/Light.Set?id=0&on=true&brightness="];

Shelly.addStatusHandler(function(status) {
  // console.log(JSON.stringify(status));
  if (typeof status.component != "undefined" && status.component == BRIGHTNESS_VC) {
    let value = status.delta.value;
    for (let i = 0; i < DIMMER_URLS.length; i++) {
      let currentUrl = DIMMER_URLS[i] + value;
      Shelly.call("HTTP.GET", {url: currentUrl}, function(result, error_code, error_message) {
        if (error_code == 0) {
          console.log("Successfully sent request.");
        }
      });
    }
  }
  
});