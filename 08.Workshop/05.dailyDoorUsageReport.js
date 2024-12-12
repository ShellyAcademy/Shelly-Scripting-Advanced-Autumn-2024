let CONFIG = {
  SCHEDULE_TIMESPEC: "20 21 * * * *",
  DOOR_WINDOW_TRIGGERED: "bthomesensor:204",
  KVS_KEY: "Script-Schedule-" + Shelly.getCurrentScriptId(),
  SCHEDULE_ID: -1,
  CALLBACK: "contentEmailOpenTotal(openObjects.length)"
};

function sendEmailNotification(htmlC) {
  const apiKey =
    ""; // YOUR BREVO API KEY
  console.log(apiKey);

  let apiUrl = "https://api.brevo.com/v3/smtp/email";
  let headers = {
    "api-key": apiKey,
  };

  let body = {
    sender: {
      name: "Denis", // Name of the sender
      email: "noreply@shelly.academy", // Email of the sender
    },
    // email can be sent to multiple emails
    to: [
      {
        name: "Denis", // Name of second receiver
        email: "shelly.softuni@gmail.com", // Email of second receiver
      },
    ],
    subject: "Energy Consumption Update",
    htmlContent: htmlC,
  };

  Shelly.call(
    "HTTP.Request",
    {
      method: "POST",
      url: apiUrl,
      headers: headers,
      body: body,
    },
    function (result, errorCode, errorMessage) {
      if (errorCode === 0) {
        console.log("Successfully sent email. Result is:", result.body);
      } else {
        console.log("There was an error sending the email:", errorMessage);
      }
    }
  );
}

function contentEmailOpenTotal(total) {
  let htmlContent =
    "<html><body>Dear Alex, your door was opened " +
    total +
    " times.</body></html>";
  sendEmailNotification(htmlContent);
}

function contentEmailWhenOpen(dateOpen, duration) {
  let htmlContent =
    "<html><body>Dear Alex, your door was opened at: " +
    dateOpen +
    " . It was opened for " +
    duration +
    " time.</body></html>";
  sendEmailNotification(htmlContent);
}

function registerIfNotRegistered() {
  Shelly.call("KVS.Get", { key: CONFIG.KVS_KEY }, function (result, error_code, error_message) {
    if (error_code != 0) {
      // KVS KEY DOES NOT EXIST
      console.log("Schedule not created yet: Install schedule.");
      installSchedule();
      return;
    }
    CONFIG.SCHEDULE_ID = result.value;
    console.log("Schedule with ID", CONFIG.SCHEDULE_ID, "already created!");
    // chech if the schedule still exists
    // if not exists, install it
    Shelly.call("Schedule.List", {}, function (result) {
      for (let i = 0; i < result.jobs.length; i++) {
        if (result.jobs[i].id === CONFIG.SCHEDULE_ID) return;
      }
      console.log("Schedule ID", CONFIG.SCHEDULE_ID, " not found. Installing new schedule");
      installSchedule();
    });
  });
}

function saveScheduleIDInKVS(scheduleId) {
  Shelly.call("KVS.Set", {
    key: CONFIG.KVS_KEY,
    value: scheduleId
  });
}

function installSchedule() {
  Shelly.call("Schedule.Create", {
    enable: true,
    timespec: CONFIG.SCHEDULE_TIMESPEC,
    calls: [
      {
        method: "script.eval",
        params: {
          id: Shelly.getCurrentScriptId(),
          code: CONFIG.CALLBACK,
        },
      },
    ],
  }, function (result) {
    CONFIG.SCHEDULE_ID = result.id;
    console.log("New schedule with ID", CONFIG.SCHEDULE_ID, " installed.");
    saveScheduleIDInKVS(result.id);
  })
}


registerIfNotRegistered();

let openObjects = [];
let closedObjects = [];

let dateOpen;
let dateClosed;
console.log("HELLO!");
Shelly.addStatusHandler(function (status) {
  let openObj = {};
  let closedObj = {};

  if (status.component == CONFIG.DOOR_WINDOW_TRIGGERED) {
    console.log(JSON.stringify(status));
    // status.delta.value == true/false
    if (status.delta.value == true) {
      let state = "open";
      let timestamp = status.delta.last_updated_ts;
      console.log("State", state);
      dateOpen = new Date(timestamp * 1000);
      console.log(dateOpen);
      openObj[state] = dateOpen;
      openObjects.push(openObj);
    } else if (status.delta.value == false) {
      let state = "closed";
      let timestamp = status.delta.last_updated_ts;
      console.log("State", state);
      dateClosed = new Date(timestamp * 1000);
      console.log(dateClosed);
      closedObj[state] = dateClosed;
      closedObjects.push(closedObj);
    }

    if (dateOpen && dateClosed) {
      console.log(dateOpen);
      console.log(dateClosed);
      // let duration = closedObj["dateClosed"] - openObj["dateClosed"];
      let differenceInMilliseconds = dateClosed - dateOpen;

      // Calculate days
      let differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      differenceInMilliseconds -= differenceInDays * (1000 * 60 * 60 * 24);

      // Calculate hours
      let differenceInHours = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60)
      );
      differenceInMilliseconds -= differenceInHours * (1000 * 60 * 60);

      // Calculate minutes
      let differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60)
      );
      differenceInMilliseconds -= differenceInMinutes * (1000 * 60);

      // Calculate seconds
      let differenceInSeconds = (differenceInMilliseconds / 1000).toFixed(2); // Keeping 2 decimal places for seconds

      let duration =
        differenceInDays +
        "d " +
        differenceInHours +
        "h " +
        differenceInMinutes +
        "m " +
        differenceInSeconds +
        "s";
      console.log("Duration: " + duration);
      contentEmailWhenOpen(dateOpen, duration);

      dateOpen = "";
      dateClosed = "";
    }
  }
});