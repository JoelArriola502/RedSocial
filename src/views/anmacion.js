const  registro=document.getElementById("Sesion");
const  Sesion=document.getElementById("Reg");
const Reganimacion=document.querySelector(".Registrar");
const iniAnimacion=document.querySelector(".Iniciar");

Sesion.addEventListener("click",ev=>{
    iniAnimacion.classList.add("Registrar");
    Reganimacion.classList.remove("Registrar")
})
registro.addEventListener("click",ev=>{
    Reganimacion.classList.add("Registrar");
    iniAnimacion.classList.remove("Registrar")
})