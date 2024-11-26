let energyThresholds = {
    high: 1000,
    critical: 1500
    // critical: 5
  }
  
  function sendEmailNotification(apower) {
    const apiKey = ""; // Your API KEY
    
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
      htmlContent: "<html><body>Dear Denis, the energy usage is: <b>" + apower + "</b>. This is your Shelly Plus Plug S Gen3</body></html>"
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
  
  function turnOffShelly() {
    Shelly.call("Switch.Set", {id: 0, on: false});
  }
  
  Shelly.addStatusHandler(function(status) {
    // console.log(JSON.stringify(status));
    let component = status["component"];
    if (component === "switch:0") {
      let apower = status["delta"]["apower"];
      if (apower) {
        console.log("We have energy update! Power:", apower);
        if (apower > energyThresholds.critical) {
          console.log("Critical energy consumption detected:", apower, "W");
          sendEmailNotification(apower);
          turnOffShelly();
        } else if (apower > energyThresholds.high) {
          console.log("High energy consumption detected:", apower, "W");
          sendEmailNotification(apower);
        }
      } 
    }
  });