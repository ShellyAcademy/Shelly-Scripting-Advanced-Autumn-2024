Shelly.addEventHandler(function (event) {
    if (event.component === "<event-type-to-listen>" && event.info.hasOwnProperty("event")) {
        let payload = { event: event.info.event };
        setDataToOtherDevice("<shelly-device-IP>", payload);
    }
});
 
//Script to write in other device (event listener device)
// let textVC = Virtual.getHandle("text:200");

// textVC.on("change", function(ev_info) {
//   event = JSON.parse(ev_info.value).event;
//   console.log(event);
// })
 
function setDataToOtherDevice(remoteDeviceIP, payload) {
    let config = {
        DEBUG: false, 
        CREATE_GROUP_FOR_VC: true, 
        new_VC_Config: { name: "P2P_Event_Box", persisted: false, default_value: "content_not_provided", max_len: 255, meta: { ui: { view: "label", icon: "https://img.icons8.com/material-rounded/50/000000/text-box.png" } } },
        baseUrls: {
            createTextVirtualComponentURL: function (remoteDeviceIP, new_VC_Config) { return remoteDeviceIP + "/rpc/Virtual.Add?type=text&config=" + JSON.stringify(new_VC_Config); },
            setContentToTextVirtualComponentURL: function (remoteDeviceIP, payloadString) { return remoteDeviceIP + "/rpc/Text.Set?id=200&value=" + payloadString; },
            createGroupURL: function (remoteDeviceIP) { return remoteDeviceIP + "/rpc/Virtual.Add?type=group"; },
            setTextVirtualComponentToGroupURL: function (remoteDeviceIP, groupId) { return remoteDeviceIP + "/rpc/Group.Set?id=" + groupId + "&value=[\"text:200\"]"; }
        }
    };
 
    let payloadString = JSON.stringify(payload);
 
    Shelly.call("HTTP.GET", { url: config.baseUrls.setContentToTextVirtualComponentURL(remoteDeviceIP, payloadString) }, function (response) {
        if (response.code === 200) {
            if (config.DEBUG) { console.log("Value set successfully to device with IP: " + remoteDeviceIP); }
        } else if (response.code === 500) {
 
            //create text vc
            Shelly.call("HTTP.GET", { url: config.baseUrls.createTextVirtualComponentURL(remoteDeviceIP, config.new_VC_Config) }, function (createResponse) {
                if (config.DEBUG) {
                    if (createResponse.code !== 200) { console.log("Failed to create virtual component, HTTP error message: " + JSON.parse(createResponse.body).message); return; }
                    console.log("Created Text virtual component for device with IP: " + remoteDeviceIP);
                }
 
                //set payload text to created vc
                Shelly.call("HTTP.GET", { url: config.baseUrls.setContentToTextVirtualComponentURL(remoteDeviceIP, payloadString) }, function (setValueResponse) {
                    if (config.DEBUG) {
                        if (setValueResponse.code !== 200) { console.log("Failed to set value, HTTP error message: " + JSON.parse(setValueResponse.body).message); return; }
                        console.log("Value set successfully after creating virtual component");
                    }
                    
                    if (config.CREATE_GROUP_FOR_VC){
                        //create group
                        Shelly.call("HTTP.GET", { url: config.baseUrls.createGroupURL(remoteDeviceIP) }, function (groupResponse) {
                            if (config.DEBUG) {
                                if (groupResponse.code !== 200) { console.log("Failed to create group, error message: " + JSON.parse(groupResponse.body).message); return; }
                                console.log("Created a group for the virtual component");
                            }
 
                            //set text vc to the group
                            let groupId = JSON.parse(groupResponse.body).id;
                            Shelly.call("HTTP.GET", { url: config.baseUrls.setTextVirtualComponentToGroupURL(remoteDeviceIP, groupId) }, function (groupSetResponse) {
                                if (config.DEBUG) {
                                    if (groupSetResponse.code !== 200) { console.log("Failed to set group, HTTP error message: " + JSON.parse(groupSetResponse.body).message); return; }
                                    console.log("Group set successfully");
                                }
                            });
                        });
                    }
                });
            });
        }
    });
}
