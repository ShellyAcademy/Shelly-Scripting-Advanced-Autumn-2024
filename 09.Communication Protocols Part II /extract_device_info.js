let device_ips = ["192.168.10.235","192.168.10.112","192.168.10.230"];

let device_infos = []

for (ip of device_ips) {
  let url = "http://" + ip + "/rpc/Shelly.GetDeviceInfo";
  Shelly.call("HTTP.GET", {url: url}, function(result, errorCode, errorMessage){
    if (errorCode == 0 && result.code == 200) {
      let device_info = JSON.parse(result.body);
      device_infos.push(device_info);
      console.log(JSON.stringify(device_info));
    }
  })
}

HTTPServer.registerEndpoint("get_devices_info", function(request, response){
  let response_str = "name,id,mac\n";
  for (device_info of device_infos) {
    response_str += device_info.name + "," + device_info.id + "," + device_info.mac + "\n";
  }
  response.body = response_str;
  response.status_code = 200;
  response.headers = [["Content-Type", "text/csv"]];
  response.send();
});