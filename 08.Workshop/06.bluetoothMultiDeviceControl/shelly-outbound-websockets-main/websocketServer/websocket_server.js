const http = require('http');
const ShellyOWS = require('./shellyOWS');

console.log("Running outbound websocket server at port 8080");

const httpServer = http.createServer();
const shellyOws = new ShellyOWS(httpServer);

shellyOws.addHandler("NotifyEvent", receiveEvents);

httpServer.listen(8080);

async function receiveEvents(clientId, params) {
    console.log(clientId, params);

    for (let eventIdx in params.events) {
        let event = params.events[eventIdx];
        console.log(event);
        if (event.event === "TURN_ON") {
            console.log("Turning on", event.data.dst);
            await shellyOws.call(event.data.dst, "Switch.Set", {"id": event.data.id, "on": true});
        } else if (event.event === "TURN_OFF") {
            console.log("Turning off", event.data.dst);
            await shellyOws.call(event.data.dst, "Switch.Set", {"id": event.data.id, "on": false});
        } else if (event.event === "TOGGLE") {
            console.log("Toggling", event.data.dst);
            await shellyOws.call(event.data.dst, "Switch.Toggle", {"id": event.data.id});
        }
    }
}