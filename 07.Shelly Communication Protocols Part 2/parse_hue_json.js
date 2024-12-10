const groupId = 82;
const url="http://192.168.10.245/hue.json";

let names = [];

Shelly.call("HTTP.GET", {url:url}, function(response) {
  console.log("Response length:", response.body.length);
//  let parsed_json = JSON.parse(response.body)
//  console.log("Test");
  let group = '"group":"' + groupId + '"'
  console.log("Looking for", group);
  let idx = 0;
  while (idx >= 0) {
    let idx = response.body.indexOf(group, idx);
    if (idx === -1) {
      continue;
    }
    console.log("Found group at", idx);
    let nameIdx = response.body.lastIndexOf('"name":', idx);
    console.log("Found name index at", nameIdx);
    let nameStart = nameIdx + 8;
    let nameEnd = response.body.indexOf('"', nameStart);
    let name = response.body.substring(nameStart, nameEnd);
    console.log("Name for group:", name);
    names.push(name);
    idx++;
  }
  console.log("Scene names found for group", groupId,": ", JSON.stringify(names));
});