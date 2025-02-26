const http = require("http");
const port=3000;
let serverStatus = undefined;
function requestListener(req, res){
    try{
        if (req.method==="GET"){
            serverStatus="live";
            res.writeHead(200,{'Content-Type':'text/plain'});
        }
    }
    catch{
        res.write("Server no data");
        res.writeHead(500, {"Content-Type":"text/json"});
    }
    finally{
        res.write(" - and the message arrived");
        res.end();
    }
}

const server = http.createServer(requestListener).listen(port);
