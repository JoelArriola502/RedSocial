const url="http://localhost:3000/Usuarios";
let gmail=document.getElementById("Correo");
let contra=document.getElementById("Contra");
function Usuarios(){
    fetch(url)
    .then(res=>res.json())
    .then((DatosUsuarios)=>{
        console.log(DatosUsuarios,'RES.JSON')
        // recorremos 
        let Correo=[],Contrasena=[];
        for(let i=0;i<DatosUsuarios.length;i++){
            Correo[i]=DatosUsuarios[i].Correo;
            Contrasena[i]=DatosUsuarios[i].Contrasena;
            console.log(`Correo ${Correo[i]} Contrasena ${Contrasena[i]}`)
            const gmail1=gmail.value;
            const contra1=contra.value;

            if(gmail1==Correo[i] && contra1==Contrasena[i]){
               
                window.location="../views/index.html";

            }else{
               alert("Datos incorrectos");
               return;
            }
 
        }

    })
}

