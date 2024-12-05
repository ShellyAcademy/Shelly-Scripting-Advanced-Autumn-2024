let url = "http://admin:password@192.168.10.112/rpc/Switch.Toggle?id=0";

Shelly.call("HTTP.GET", {url: url});