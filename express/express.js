const express = require('express')
const app = express();
const port = 3000;


const mid1 = (req,res, next) =>{

}
const mid2 = (req,res, next) =>{
    
}
const mid3 = (req,res, next) =>{
    
}
app.use(mid1);
app.use(mid2);
app.use(mid3);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})