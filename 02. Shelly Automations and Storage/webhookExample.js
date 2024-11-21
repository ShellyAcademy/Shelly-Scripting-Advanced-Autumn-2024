function getUrls(on) {
    urls = [
      "http://192.168.10.215/rpc/Switch.Set?id=0&on=" + on,
      "http://192.168.10.183/rpc/Switch.Set?id=0&on=" + on,
      "http://192.168.10.55/rpc/Switch.Set?id=0&on=" + on
    ]
    return urls;
  }
  
  Shelly.call("WebHook.Create", 
    {
      enable: true,
      event: "switch.on",
      name: "turn_on_lights",
      urls: getUrls(true),
      cid: 0
    }, function(result){
      console.log(result);
  });
  
  Shelly.call("WebHook.Create", 
    {
      enable: true,
      event: "switch.off",
      name: "turn_off_lights",
      urls: getUrls(false),
      cid: 0
    });