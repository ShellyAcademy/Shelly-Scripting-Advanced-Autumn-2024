let CONFIG = {
    KVS_KEY: "counter",
    MAX_REBOOT_THRESHOLD: 10
  };
  
  function sendEmailNotification(counter) {
    const apiKey = ""; // Your API Key
    
    let apiUrl = "https://api.brevo.com/v3/smtp/email";
    
    let headers = {
      "api-key": apiKey
    };
    
    let body = {
      sender: {
        name: "Shelly",
        email: "noreply@shelly.academy"
      },
      to: [
        {
          name: "Denis",
          email: "shelly.softuni@gmail.com"
        }
      ],
      subject: "Energy consumption update",
      htmlContent: "<html><body>Dear Denis, your Shelly Plus Plug S Gen3 device was rebooted: <b>" + counter + "</b> tiimes.</body></html>"
    }
    
    Shelly.call("HTTP.Request", {
      method: "POST",
      url: apiUrl,
      headers: headers,
      body: body
    }, function(result, errorCode, errorMessage) {
      if (errorCode === 0) {
        console.log("Successfully sent email. Result is:", result.body);
      } else {
        console.log("There was an error sending the email:", errorMessage);
      }
    })
  }
  
  Shelly.call("KVS.Get", {key: CONFIG.KVS_KEY}, function(result, error_code, error_message) {
    // let counter = result.value; - This is wrongm it leads to undefined
    // console.log(counter);
    console.log(error_code);
    // Check if we have the 'counter' key in our KVS store, if we do not have it, register it for the first time
    if (error_code != 0) {
      console.log("First time!");
      let counter = 1;
      Shelly.call("KVS.Set", {key: CONFIG.KVS_KEY, value: counter});
    } else { // This means that we have the 'counter' key in our KVS store, we just incerement it
      let counter = result.value;
      if (counter >= CONFIG.MAX_REBOOT_THRESHOLD) {
        sendEmailNotification(counter);
      }
      counter = counter + 1;
      console.log("Script was started:", counter, "times.");
      Shelly.call("KVS.Set", {key: CONFIG.KVS_KEY, value: counter});
    }
  });