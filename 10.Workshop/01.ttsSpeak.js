const CONFIG = {
    HA_TOKEN: "",
    SPEAK_URL: "http://192.168.10.153:8123/api/services/tts/speak",
    TTS_MESSAGE_VC: "text:200",
    TTS_SPEAK_VC: "button:201"
  }
  
  let messageVC = Virtual.getHandle(CONFIG.TTS_MESSAGE_VC);
  let speakVC = Virtual.getHandle(CONFIG.TTS_SPEAK_VC);
  
  let headers = {
    "Authorization": "Bearer " + CONFIG.HA_TOKEN
  };
  
  speakVC.on("single_push", function() {
    let message = messageVC.getValue();
    let request = {
      "entity_id": "tts.google_translate_en_com",
      "media_player_entity_id": "media_player.living_room_speaker",
      "message": message
    }
    console.log("Sending", message, "to the speaker");
    Shelly.call("HTTP.Request", {url: CONFIG.SPEAK_URL, method: "POST", headers: headers, body: request});
    
  })