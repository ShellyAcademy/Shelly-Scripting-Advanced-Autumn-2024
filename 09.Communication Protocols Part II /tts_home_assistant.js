const AUTH_TOKEN="<auth-token>>";
const TEXT_VC="text:200";
const SPEAK_VC="button:200";

function send_to_ha(message) {
  let ha_url = "http://192.168.10.245:8123/api/services/tts/speak";
  let data = {
    "entity_id": "tts.google_translate_en_com",
    "media_player_entity_id": "media_player.living_room_speaker",
    "message": message
  }
  let request = {
    url: ha_url,
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Authorization": "Bearer " + AUTH_TOKEN
    }
  }
  Shelly.call("HTTP.Request", request);
}

Shelly.addEventHandler(function(eventData){
  if (typeof eventData.component != "undefined" && eventData.component===SPEAK_VC 
      && eventData.info.event === "single_push") {
    let text_to_speak = Shelly.getComponentStatus(TEXT_VC).value;
    console.log("Speaking:", text_to_speak);
    send_to_ha(text_to_speak);
  }
});