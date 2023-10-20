const url="http://localhost:3000/Usuarios";
let gmail=document.getElementById("Correo");
let contra=document.getElementById("Contra");
function Usuarios(){
    const gmail1=gmail.value;
    const contra1=contra.value;
    if(!gmail1|| !contra1){
        alert(
            "Complete todo los campos y seleccione su cuenta"
        );
        return;
    }
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


            if(gmail1==Correo[i] && contra1==Contrasena[i]){
               
                window.location="../views/index.html";
                break;

            }else{

                alert(
                    "CREDENCIALES INCORRECTAS"
                );
                return;
            }
 
        }

    })
}


//Datos de perfil
const Perfil=document.getElementById("Perfil");
const Perfil2=document.getElementById("Perfil2");
function DatosPerfil(){
    fetch("http://localhost:3000/Perfil")
    .then(res=>res.json())
    .then((DatosPerdfil)=>{
        console.log(DatosPerdfil,'RES.JSON');
        let Nombre=[],Apellido=[];
        let html="";
        for(let i=0;i<DatosPerdfil.length;i++){
            Nombre[i]=DatosPerdfil[i].Nombre;
            Apellido[i]=DatosPerdfil[i].Apellido;
           
            
            html=html+`
            <div class="Perfiles">
            
            
            <p>${Nombre[i]} ${Apellido[i]}</p>
        </div>
            `;
            Perfil.innerHTML=html;
            Perfil2.innerHTML=html;

            }
        
       
    })

}
DatosPerfil();