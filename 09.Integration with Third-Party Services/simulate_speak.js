const TEXT_VC_ID = 200;
const SPEAK_VC_ID = 200;

let text_to_speak = "This is from a script!"

Shelly.call("Text.Set", {id:TEXT_VC_ID, value: text_to_speak}, function(){
  Shelly.call("Button.trigger", {id:SPEAK_VC_ID, event: "single_push"});
});