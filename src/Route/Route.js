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
//Api de datos para perfil 
router.get('/Perfil',(req,res)=>{
    conexion.query('SELECT idUsuarios,Nombre,Apellido,Correo,Contrasena FROM Usuarios',(error,results)=>{
        if(error){
            console.error("All error al obtener el nombre y apellido",error)
        }else{
            res.json(results);
        }
    })
})
module.exports = router;