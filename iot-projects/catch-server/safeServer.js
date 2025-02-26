const http = require("http");
const port=3000;
let serverStatus = undefined;
function requestListener(req, res){
    try{
        if (req.method === "GET"){
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.write(serverStatus);
        }
        else if (req.method==="PUT"){
            var body = "";
            req.on("data", function (data){
                body += data;
            });
            req.on("end", function(){
                serverStatus={};
                console.log(body)
                serverStatus.status = JSON.parse(body);
                res.writeHead(200, {'Content-Type':"text/plain"});
            });   
                         res.write("Server Updated");

        }
    }
    catch {
        res.writeHead(500, {"Content-Type":"text/json"});
        res.write("Server no data");
    }
    finally{
        res.write(" - and the message arrived");
        res.end();
    }
}

const server = http.createServer(requestListener).listen(port);
