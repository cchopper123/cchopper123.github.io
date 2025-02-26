const http = require("http");
const port=3000;
const server = http.createServer().listen(port);
let serverStatus = undefined;