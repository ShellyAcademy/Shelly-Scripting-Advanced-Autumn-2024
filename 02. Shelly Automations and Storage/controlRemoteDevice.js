urls = [
    'http://192.168.10.123/rpc/Number.set?id=200&value=${status["input:100"].percent}',
    //'http://192.168.10.123/rpc/Number.set?id=200&value=$percent',
  ]
  
  Shelly.call("Webhook.Create",
  {
    enable:true,
    event:"input.analog_change",
    cid:100,
    name:"analog_measure_sync",
    urls: urls
  });