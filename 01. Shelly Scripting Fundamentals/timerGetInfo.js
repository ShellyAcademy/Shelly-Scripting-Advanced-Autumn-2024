th = Timer.set(5000, true, function(){console.log("tick")});
Timer.set(2000, true, function() {
  let timerInfo = Timer.getInfo(th);
  console.log(timerInfo);
  remainingTime = timerInfo.next - Shelly.getUptimeMs();
  console.log("Remaining time of the timer", remainingTime);
});