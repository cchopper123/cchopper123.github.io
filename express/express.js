const express = require('express');
const json2html = require('node-jsonhtml');
const app = express();
const port = 3000;

let data = {
    'name':'cheese',
    'age':3
};

let transform= [];
let html = json2html(render(data, transform));
console.log(html.split('><').join('>\n<'));

const mid1 = (req,res, next) =>{
    req.first = "first"
    next()
}
const mid2 = (req,res, next) =>{
    req.second = "second"
    next()
}
const mid3 = (req,res, next) =>{
    req.third = "third"
    res.send(`${req.first}  ${req.second}  ${req.third}  ${req.fourth}`);
}
const mid4 = (req,res, next) =>{
    req.fourth = "fourth"
    next();
}


app.use(mid1);
app.use(mid2);
app.get("/secret", mid4);
app.use(mid3);
app.listen(port, () => {
  console.log(`I am sad ${port}`)
})