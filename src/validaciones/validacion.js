const url="http://localhost:3000/Mostrar";
let gmail=document.getElementById("Correo");
let contra=document.getElementById("Contra");
const NombreRe=document.getElementById("Nombre");
const ApellidoRe=document.getElementById("Apellido");
const CorreoRe=document.getElementById("email");
const contrasenaRe=document.getElementById("ContrasenaR");
const Perfil=document.getElementById("Muestra");
function Usuarios() {
    const gmail1 = gmail.value;
    const contra1 = contra.value;

    if (!gmail1 || !contra1) {
        alert("Agrege su Correo y Contraseña");
        return;
    }

    fetch(url) // Reemplaza 'url' con la URL correcta de tu API
        .then(res => res.json())
        .then(DatosUsuarios => {
            console.log(DatosUsuarios, 'RES.JSON');
            let ValidarCredenciales = false;
            let usuarioNombre = ''; // Variable para almacenar el nombre del usuario
            let ApellidoU = ''; // Variable para almacenar el apellido del usuario
            let idU='';

            for (let i = 0; i < DatosUsuarios.length; i++) {
                const Correo = DatosUsuarios[i].Correo;
                const Contrasena = DatosUsuarios[i].Contrasena;
                const Nombre = DatosUsuarios[i].Nombre;
                const Apellido = DatosUsuarios[i].Apellido;
                const idUsuarios=DatosUsuarios[i].idUsuarios;

                if (gmail1 === Correo && contra1 === Contrasena) {
                    ValidarCredenciales = true;
                    usuarioNombre = Nombre; // Guarda el nombre del usuario
                    ApellidoU = Apellido; // Guarda el apellido del usuario
                    idU=idUsuarios;
                    break;
                }
            }

            if (ValidarCredenciales) {
                // Credenciales válidas, redirige al usuario a index.html con el nombre y el apellido en la URL
                window.location = `../views/index.html?idusuario=${encodeURIComponent(idU)}&nombre=${encodeURIComponent(usuarioNombre)}&apellido=${encodeURIComponent(ApellidoU)}`;
            } else {
                alert("CREDENCIALES INCORRECTAS");
            }
        })
        .catch(error => {
            console.error("Error al verificar las credenciales", error);
        });
}
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreUsuario = urlParams.get("nombre");
    const apellidoUsuario = urlParams.get("apellido");
    const idusuario=urlParams.get("idusuario");

    if (nombreUsuario && apellidoUsuario) {
        document.getElementById("Perfil").textContent =  nombreUsuario + " " + apellidoUsuario;
    }


    fetch(`http://localhost:3000/seguidores/${idusuario}`)
    .then(res=>res.json())
    .then((Seguidores)=>{
        console.log(Seguidores,'RES.JSON');
        let html="";

        for(let i=0;i<Seguidores.length;i++){

        }
    })
        
            
    
});
//funcion seguidores 


function Seguidores(){
    const urlParams = new URLSearchParams(window.location.search);
    const idusuario=urlParams.get("idusuario");
    fetch(`http://localhost:3000/seguidores/${idusuario}`)
    .then(res=>res.json())
    .then((Seguidores)=>{
        console.log(Seguidores,'RES.JSON');
        let html="";

        for(let i=0;i<Seguidores.length;i++){
            const Nombres=Seguidores[i].Nombre;
            const Apellidos=Seguidores[i].Apellido;
            const idu=Seguidores[i].idUsuarios;
            const idUsuariosD=Seguidores[i].idUsuariosD;
            console.log(`idSeguidores verifica ${idUsuariosD}`);
            html=html+`
            <div class="Perfiles">
            
            
            <p><button onclick="Dejarseguir(${idUsuariosD})">Dejar de seguir</button>${Nombres} ${Apellidos}</p>
        </div>
            
            `
            Perfil.innerHTML=html;

        }
    })
        

}
const obtenerFechaYHoraActual = () => {
    const ahora = new Date();

    // Formatear la fecha y hora en el formato de SQL Server DATETIME
    const fechaYHoraFormateada = ahora.toISOString().slice(0, 19).replace('T', ' ');

    return fechaYHoraFormateada;
}


function Gmail(){
    const FechaCreacion=obtenerFechaYHoraActual();
    const Nombre=NombreRe.value;
        const Correo=CorreoRe.value;
        const Apellido=ApellidoRe.value;
        const Contrasena=contrasenaRe.value;
        

        if(!Nombre || !Apellido || !Correo ||!Contrasena){
            alert(
                "Asegurese que todo los campos esten llenos"
            );
            return;
        }else{

            fetch("http://localhost:3000/Mostrar")
            .then(res=>res.json())
            .then((Usuarios)=>{
                console.log(Usuarios,'RES.JSON')
                //RECORRER LA API

                const CorreosRegistrados = Usuarios.map(usuario => usuario.Correo);

                if (CorreosRegistrados.includes(Correo)) {
                    alert("Ya hay una cuenta registrada");
                    return;
                } else {
                        
                        fetch('http://localhost:3000/Nuevousuario',{
                      method:"POST",
                      headers:{
                "Content-Type": "application/json",
            },

            
            body: JSON.stringify({Nombre,Apellido,Correo,FechaCreacion,Contrasena}),
        })
        .then((res)=>res.json())
        .then((json)=>{
            NombreRe.value="";
            ApellidoRe.value="";
            CorreoRe.value="";
            contrasenaRe.value="";
                })
                .catch((error)=>{
                    console.error("Error al reguistrar",error);
                })
                    
                }
            })
            

        }
}



function CrearPublicacion(){
    const Fecha=obtenerFechaYHoraActual();
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuarios=urlParams.get("idusuario");
    const DescripcionJ=document.getElementById("Descripcion");
    const imagenJ=document.getElementById("imagen");
    const Descripcion=DescripcionJ.value;
    const imagen=imagenJ.value;
    if(!Descripcion||!imagen){

        alert(
            "No hay completado la publicación"
        );
        return;
       
    }else{
   
            fetch('http://localhost:3000/NuevaPublicacion',{
              method:"POST",
              headers:{
                "Content-Type": "application/json",
            },

            
            body: JSON.stringify({Descripcion,Fecha,imagen,idUsuarios}),
        })
        .then((res)=>res.json())
        .then((json)=>{
            alert("Publicacion Creada");
            DescripcionJ.value="";
            imagenJ.value="";

            
                })
                .catch((error)=>{
                    console.error("Error al reguistrar",error);
                })
                    
            }
            }

//Datos de perfil
function DatosPerfil(){
    const urlParams = new URLSearchParams(window.location.search);
    const idusuario=urlParams.get("idusuario");
    fetch(`http://localhost:3000/Excluye/${idusuario}`)
    .then(res=>res.json())
    .then((DatosPerdfil)=>{
        console.log(DatosPerdfil,'RES.JSON');
        let Nombre=[],Apellido=[];
        let html="";
        for(let i=0;i<DatosPerdfil.length;i++){
            Nombre[i]=DatosPerdfil[i].Nombre;
            Apellido[i]=DatosPerdfil[i].Apellido;
            const idUsuarios=DatosPerdfil[i].idUsuarios;
            
            html=html+`
            <div class="Perfiles">
            
            <button onclick="Seguir(${idUsuarios})">Seguir</button>
            <p>${Nombre[i]} ${Apellido[i]}</p>
        </div>
            `;
            Perfil.innerHTML=html;
            

            }
        
       
    })


};

//funcion para dejar de seguir

function Dejarseguir(idUsuariosD){
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuariosO=parseInt(urlParams.get("idusuario"));
    const idUsuariosSegundo=parseInt(idUsuariosD);
    fetch(`http://localhost:3000/EliminarSiguiendo/${idUsuariosO}/${idUsuariosSegundo}`,{
       method: 'DELETE',
       headers:{
        "Content-Type": "application/json",}
    })
    .then(Eliminado=>{
           
            if(Eliminado.length===0){
                if (Eliminado.ok) {
                    alert("Seguidor eliminado con éxito.");
                     Seguidores();
                } else {
                    alert("No se pudo eliminar el seguidor.");
                }
               
                
            }else{
                actualizarPagina();
            }
            
       
    })
    .catch((e)=>{
        console.error('Error',e);
    })
    

}
function Seguir(idUsuarios){
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuariosActual=parseInt(urlParams.get("idusuario"));
    const idUsuariosSegundo=parseInt(idUsuarios);
    console.log(`primero ${idUsuariosActual} segundo ${idUsuariosSegundo}`)
    fetch("http://localhost:3000/SeguirV")
    .then(res=>res.json())
    .then((SeguirValidar)=>{
        let Verdader=false;
       for(let i=0;i<SeguirValidar.length;i++){
        const Seguidores=SeguirValidar[i].idUsuariosO;
        const Seguidores2=SeguirValidar[i].idUsuariosD;
        console.log(`primero ${Seguidores} segundo ${Seguidores2}`)
        if(Seguidores===idUsuariosActual && Seguidores2===idUsuariosSegundo){
            Verdader=true;
        }
       }
        
            if(Verdader){
                alert("ya esta siguiendo")
            }else{
                SeguirInsertar(idUsuarios);

            }
        
            })



}
//funcion seguir 
function SeguirInsertar(idUsuarios){
    const Fecha=obtenerFechaYHoraActual();
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuariosO=urlParams.get("idusuario");
    const idUsuariosD=idUsuarios;
    
            fetch('http://localhost:3000/seguirUsuarios',{
                method:"POST",
                headers:{
                  "Content-Type": "application/json",
              },
  
              
              body: JSON.stringify({idUsuariosO,idUsuariosD}),
          })
          .then((res)=>res.json())
          .then((json)=>{
            alert("Siguiendo")
          
                  })
                
                  .catch((error)=>{
                      console.error("Error al seguir",error);
                  })
                
        


}


function actualizarPagina() {
    location.reload();
  }


 
// Llamamos a la función para obtener la fecha y hora actual formateada
const fechaYHoraActual = obtenerFechaYHoraActual();

// Imprimimos el resultado
console.log(`La fecha y hora actual en formato DATETIME es: ${fechaYHoraActual}`);
 
