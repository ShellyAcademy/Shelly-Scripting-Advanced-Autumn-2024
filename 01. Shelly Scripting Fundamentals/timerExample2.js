const TIME_REPEAT_TIMER = 2;
let timerCounter = 0;

timerHandle = Timer.set(3000, true, function(){
  console.log("tick")
  timerCounter++;
  if (timerCounter===TIME_REPEAT_TIMER) {
    die("Timer and script are stopped");
  }
});