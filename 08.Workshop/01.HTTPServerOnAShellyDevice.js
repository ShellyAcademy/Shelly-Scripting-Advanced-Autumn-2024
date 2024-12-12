function parseQueryString(queryString) {
    let queryParams = {};
    queryString = queryString.charAt(0) === "?" ? queryString.substring(1) : queryString;
    let pairs = queryString.split("&");
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split("=");
      let key = pair[0];
      let value = pair[1];
      queryParams[key] = value;
    }
    return queryParams;
  }
  
  // console.log(parseQueryString("?name=Denis&age=27"));
  
  HTTPServer.registerEndpoint("data", function(request, response) {
    if (request.method === "GET") {
      let queryParams = parseQueryString(request.query);
      response.headers = [["Content-Type", "text/plain"]];
      // response.headers = [["Content-Type", "application/json"]];
      response.body = queryParams.name + " " + queryParams.message;
      // response.body = JSON.stringify(queryParams);
      response.code = 200;
      response.send(true);
    } else if (request.method === "POST") {
      let data = JSON.parse(request.body);
      console.log("Received data:", data);
      response.code = 200;
      response.headers = [["Content-Type", "application/json"]];
      response.body = JSON.stringify({status: "success", message: "Data processed", content: data});
      response.send(true);
    } else {
      response.code = 400;
      response.headers = [["Content-Type", "application/json"]];
      response.body = JSON.stringify({status: "error", message: "Invalid request"});
      response.send(true);
    }
  });