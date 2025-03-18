const http = require("http");
var port = 3000;
var list = [];
var secret =
  "girl you blanching i live up in a mansion what ugh i cant get that stupid blanching song out of my head of you blanching back street by little dog what is even blanching rappers cant just make up words rappers are visonaries wendy if rappers told me to eat my own pants i would eat your own pants eat your own pants";
var data = undefined;
var notSecret = "i like sleeping";
http
  .createServer(function (req, res) {
    //get stuff from html
    if (req.method === "GET") {
      //set status code to 200 and content type to plain
      res.writeHead(200, { "Content-Type": "text/plain" });
      //respond with your secret
      if (req.url === "/secret") {
        res.end(secret);
      } else {
        res.end(notSecret);
      }
      //processing incoming request
    } else if (req.method === "PUT") {
      req.on("data", function (chunk) {
        console.log(chunk.toString());
        secret += chunk.toString();
      });
      // responding to put request
      req.on("end", function () {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(secret);
      });
    } else if (req.method === "POST") {
      //adding stuff
      req.on("data", function (chunk) {
        //push data to list
        const incomingData = chunk.toString();
        list.push(incomingData);
      });

      req.on("end", function () {
        res.writeHead(200, { "content-type": "text/plain" });
        console.log(list);
        res.end(JSON.stringify(list));
      });
      //deleting stuff
    } else if (req.method === "DELETE") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      secret = undefined;
      res.end(
        "hey guys im 16 im the new player on the basket ball team im really excited to play mr bolton we know it is you-"
      );
    } else {
    }
  })
  .listen(port, "0.0.0.0");

console.log("Listening on.. " + port);
console.log(`http://localhost:${port}`);
