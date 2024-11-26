function Queue() {
    this.items = [];
  
    this.isEmpty = function () {
      return this.items.length === 0;
    };
   
    this.enqueue = function (element) {
      this.items.push(element);
    };
    
   
    this.dequeue = function () {
      if (this.isEmpty()) {
        return 'Queue is empty';
      }
      return this.items.splice(0, 1)[0];
    };
   
    this.size = function () {
      return this.items.length;
    };
   
    this.front = function () {
      if (this.isEmpty()) {
        return 'Queue is empty';
      }
      return this.items[0];
    };
  }
  
  let activeTimers = [];
  let timerQueue = new Queue();
  const MAX_TIMERS = 5;
  
  let zone = {
    id:null,
    size:null,
    duration:null,
    timerHandle:null,
    init: function(id, size) {
      this.id = id;
      this.size = size;
      this.duration = size * 1000;
    }
  }
  
  function startWatering(zone) {
    console.log("Watering zone:", zone.id);
    // Placeholder for actual pump activation
  }
  
  function stopWatering(zone) {
    console.log("Stopping watering zone:", zone.id);
    // Placeholder for actual pump deactiivation
  }
  
  function clearPump(timerHandle) {
    let newActiveTimers = [];
    for (let i = 0; i < activeTimers.length; i++) {
      if (activeTimers[i] !== timerHandle) {
        newActiveTimers.push(activeTimers[i]);
      }
    }
    activeTimers = newActiveTimers;
    Timer.clear(timerHandle);
  }
  
  function checkAndStartQueuedTimer() {
    if (!timerQueue.isEmpty() && activeTimers.length < MAX_TIMERS) {
      let zone = timerQueue.dequeue();
      setPump(zone);
    }
  }
  
  function setPump(zone) {
    if (activeTimers.length < MAX_TIMERS) {
      zone.timerHandle = Timer.set(zone.duration, false, function() {
        stopWatering(zone);
        clearPump(zone.timerHandle);
        checkAndStartQueuedTimer();
      })
      activeTimers.push(zone.timerHandle);
      startWatering(zone);
      return zone.timerHandle;
    } else {
      timerQueue.enqueue(zone);
      return null;
    }
  }
  
  // Initialize zones
  let zones = [];
  for (let i = 1; i <= 10; i++) {
    let currentZone = Object.create(zone);
    currentZone.init(i, i + 2);
    zones.push(currentZone);
  }
  
  for (let zone of zones) {
    setPump(zone);
  }