function changePlugColors(red, green, blue) {
    let plugURL = 'http://192.168.10.235/rpc/PLUGS_UI.SetConfig?config={"leds":{"mode":"switch","colors":{"switch:0":{"on":{"rgb":[' + red + ',' + green + ',' + blue + '],"brightness":100},"off":{"rgb":[100,100,100],"brightness":100}},"power":{"brightness":100}},"night_mode":{"enable":false,"brightness":10,"active_between":["22:00","06:00"]}},"controls":{"switch:0":{"in_mode":"detached"}}}';
    Shelly.call("HTTP.GET", { url: plugURL });
}

function changePlugBrightness(brightness) {
    let plugURL = 'http://192.168.10.235/rpc/PLUGS_UI.SetConfig?config={"leds":{"mode":"switch","colors":{"switch:0":{"on":{"rgb":[100,100,100],"brightness":' + brightness + '},"off":{"rgb":[100,100,100],"brightness":100}},"power":{"brightness":100}},"night_mode":{"enable":false,"brightness":10,"active_between":["22:00","06:00"]}},"controls":{"switch:0":{"in_mode":"detached"}}}'
    Shelly.call("HTTP.GET", { url: plugURL });
}

function setNightMode(brightness) {
    let plugURL = 'http://192.168.10.235/rpc/PLUGS_UI.SetConfig?config={"leds":{"mode":"switch","colors":{"switch:0":{"on":{"rgb":[100,100,100],"brightness":100},"off":{"rgb":[100,100,100],"brightness":100}},"power":{"brightness":100}},"night_mode":{"enable":true,"brightness":' + brightness + ',"active_between":["22:00","06:00"]}},"controls":{"switch:0":{"in_mode":"detached"}}}'
    Shelly.call("HTTP.GET", { url: plugURL });
}

function toggleSwitch() {
    let plugURL = "http://192.168.10.235/rpc/Switch.Toggle?id=0";
    Shelly.call("HTTP.GET", { url: plugURL });
}

Shelly.addEventHandler(function (event) {
    // console.log(JSON.stringify(event));
    if (typeof event.info.component != "undefined") {
        if (event.info.component == "input:0" && event.info.event == "single_push") {
            let red = Math.round(Math.random(0, 1) * 100);
            let green = Math.round(Math.random(0, 1) * 100);
            let blue = Math.round(Math.random(0, 1) * 100);
            changePlugColors(red, green, blue);
        } else if (event.info.component == "input:1" && event.info.event == "single_push") {
            console.log("INPUT:1 WAS PRESSED. SINGLE PUSH");
            let plugURL = "http://192.168.10.235/rpc/PLUGS_UI.GetConfig";
            Shelly.call("HTTP.GET", { url: plugURL }, function (result) {
                let result = JSON.parse(result.body);
                console.log("RESULT:", result);
                let currentBrightness = result['leds']['colors']['switch:0']['on']['brightness'];
                console.log("Current brightness is:", currentBrightness);
                if (currentBrightness + 10 < 100) {
                    let newBrightness = currentBrightness + 10;
                    changePlugBrightness(newBrightness);
                } else if (currentBrightness > 10 >= 100) {
                    let newBrightness = 100;
                    changePlugBrightness(newBrightness);
                }
            });
        } else if (event.info.component == "input:2" && event.info.event == "single_push") {
            let brightness = 10;
            console.log("Setting night mode...");
            setNightMode(brightness);
        } else if (event.info.component == "input:3" && event.info.event == "single_push") {
            toggleSwitch();
        }
    }
});