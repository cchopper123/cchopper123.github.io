// fetchServer.js file
var args = process.argv.slice(2);

const http = require("http");
var port = 8080;

http.createServer(async function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    //console.log("raggedy princess could make you a new hambo in 10 seconds");
    var url =args[0] ? args[0]:"https://cchopper123.github.io";
    var fetchResponse = await fetch(url);
    if (fetchResponse.ok===true){
        var html = await fetchResponse.text();
        res.write(html);
        res.end();
    }else{
        res.write(fetchResponse.statusText, fetchResponse.status);
        res.end();
    }

}).listen(port);
//or raggedy princess could be your new hambo
//she'd do it too
//that girl has 0 self respect
//hah
//that's mean
//don't tell her I said that
//im on todo 5