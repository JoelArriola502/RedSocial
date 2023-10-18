const express=require("express");
const router=express.Router();
const conexion=require("../Conexion/bd");
router.get('/Usuarios',(req,res)=>{
    conexion.query('select Correo,Contrasena from Usuarios',(error,results)=>{
        if(error){
            console.error("Al parecer hay un error ",error)
        }else{
            res.json(results);
        }
    })
})
module.exports = router;