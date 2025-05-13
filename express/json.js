const express = require("express");
const json2html = require("node-jsonhtml");
const app = express();
const port = 3000;

let data = [
  { name: "Heat", age: "1996" },
  { name: "Snatch", age: "2000" },
];

let transform = { 
    "<>": "div", 
    html: [
        {"<>": "p", text:"${name}"}, 
        {"<>": "h1", text:"${age}"}, 
    ],
};
let html = json2html(render(data, transform));


console.log(html.split("><").join(">\n<"));

app.listen(port, () => {
  console.log(`I am sad ${port}`);
});
