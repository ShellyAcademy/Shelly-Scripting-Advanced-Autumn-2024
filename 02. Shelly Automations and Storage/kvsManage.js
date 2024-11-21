Shelly.call("KVS.Set", {key: "item1", value: "item1 value"});
Shelly.call("KVS.Get", {key: "item1"}, function(result) {
  console.log(result);
});