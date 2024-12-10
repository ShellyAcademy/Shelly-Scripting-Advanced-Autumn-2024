HTTPServer.registerEndpoint("my_custom_endpoint", function(request, response){
    console.log(JSON.stringify(request));
    
    response.code = 200;
    //response.body = "Everything is alright!";
    //response.headers = [["Content-type", "text/plain"]];
    response.body = JSON.stringify({
      "result": "success"
    })
    response.headers = [["Content-type", "application/json"]];
    response.send();
  });