let firstButtonId = 210;
let secondButtonId = 211;
let thirdButtonId = 212;
let fourthButtonId = 213;
let counter = 5;
let timerObj;

let expectedEvents = [
  {"id": firstButtonId, "event": "single_push"},
  {"id": secondButtonId, "event": "single_push"},
  {"id": thirdButtonId, "event": "single_push"}
];

let userInputEvents = []; // Array to collect user inputs

Shelly.addEventHandler(function(event) {
  if (event.id == firstButtonId || event.id == secondButtonId || event.id == thirdButtonId || event.id == fourthButtonId) {
    console.log("Button clicked with ID:", event.id);
    addEventToUserInputList(event, true);
  }
});

function addEventToUserInputList(event, isEvent) {
  let userEvent = {};
  if (isEvent) {
    userEvent = {id: event.id, event: event.info.event};
  } else {
    userEvent = {id: event.id, event: event.delta.value};
  }
  console.log("event added:", userEvent);
  userInputEvents.push(userEvent);
  
  if (userInputEvents.length === expectedEvents.length) {
    if (compareUserInputWithExpected()) {
      console.log("Success!");
      Shelly.call("Switch.Toggle", {id: 0});
    } else {
      timerObj = Timer.set(1000, true, timerCode);
      console.log("No ", userInputEvents.length);
    }
    userInputEvents = [];
    console.log(userInputEvents.length);
  }
}

function timerCode() {
  if (counter == 0) {
    Timer.clear(timerObj);
    counter = 5;
  }
  Shelly.call("Switch.Toggle", {id: 0});
  counter--;
}

function compareUserInputWithExpected() {
  for (let i = 0; i < expectedEvents.length; i++) {
    if (expectedEvents[i].id !== userInputEvents[i].id || String(expectedEvents[i].event) !== String(userInputEvents[i].event)) {
      return false;
    }
  }
  return true;
}