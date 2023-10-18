const express=require("express");
const cors=require("cors");
const app=express();
const port=3000;
app.use(cors());
app.use('/',require('./src/Route/Route'));
app.listen(port,()=>{
    console.log(`Corriendo en el servidor ${port}`);
})
