const http = require("http");
var port=3000;
var secret='girl you blanching i live up in a mansion what ugh i cant get that stupid blanching song out of my head of you blanching back street by little dog what is even blanching rappers cant just make up words rappers are visonaries wendy if rappers told me to eat my own pants i would eat your own pants eat your own pants';
var data=undefined;
http.createServer(function(req,res){
    if (req.method==="GET"){
        //set status code to 200 and content type to plain
        res.writeHead(200, {'Content-Type':'text/plain'});
        //respond with your secret
        res.end(secret);
    }else if (req.method==="PUT"){

    }else if (req.method === "POST"){

    }else if (req.method === "DELETE"){

    }else{

    }
}).listen(port);


console.log("Listening on.. " + port);
console.log(`http://localhost:${port}`);