function func() {
    globalVar = "This is global";
  }
  
  function func2() {
    console.log("Accessing global var from another function:", globalVar);
  }
  
  func();
  console.log(globalVar);
  func2();