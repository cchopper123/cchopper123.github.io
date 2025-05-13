const express = require('express');
const app = express();
const port = 3000;


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
    res.send(req.first + req.second + req.third);
}
app.use(mid1);
app.use(mid2);
app.use(mid3);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})