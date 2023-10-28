

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
        alert("Agrega tu correo y contraseña");
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(DatosUsuarios => {
            let ValidarCredenciales = false;

            for (let i = 0; i < DatosUsuarios.length; i++) {
                const foto=DatosUsuarios[i].foto;
                const Correo = DatosUsuarios[i].Correo;
                const Contrasena = DatosUsuarios[i].Contrasena;
                const Nombre = DatosUsuarios[i].Nombre;
                const Apellido = DatosUsuarios[i].Apellido;
                const idUsuarios = DatosUsuarios[i].idUsuarios;
                console.log(foto);

                if (gmail1 === Correo && contra1 === Contrasena) {
                    ValidarCredenciales = true;
                    
                    // Almacena los datos del usuario en sessionStorage variable se seión
                    sessionStorage.setItem('foto',foto);
                    sessionStorage.setItem('idUsuarios', idUsuarios);
                    sessionStorage.setItem('Nombre', Nombre);
                    sessionStorage.setItem('Apellido', Apellido);
                    
                    break;
                }
            }

            if (ValidarCredenciales) {
                // Credenciales válidas, redirige al usuario a la página principal
                window.location = '../views/index.html';
            } else {
                alert("CREDENCIALES INCORRECTAS");
            }
        })
        .catch(error => {
            console.error("Error al verificar las credenciales", error);
        });
}
const fotos=sessionStorage.getItem('foto');
const idUsuario = sessionStorage.getItem('idUsuarios');
const nombreUsuario = sessionStorage.getItem('Nombre');
const apellidoUsuario = sessionStorage.getItem('Apellido');
function muestra () {
    const fotoActua=sessionStorage.getItem('foto');
    const fotosO=String(fotoActua);
    let html="";
    html=html+` 
     <div class="DatosPerfil">  
     <button onclick="PerfilUsuario()" id="perfilUsuarioA">
     <div class="FotoPerfil">  
     <img src="${fotosO}">
     </div>
     <div class="NombrePerfil">  
        <h4>${nombreUsuario} ${apellidoUsuario}</h4>
     </div>
     </button>
     </div>
    `
     const Datos=document.getElementById("Perfil");
      Datos.innerHTML=html;    
         
           
};
document.addEventListener("DOMContentLoaded",ev=>muestra());
//funcion seguidores 


function Siguiendo(){
    fetch(`http://localhost:3000/seguidores/${idUsuario}`)
    .then(res=>res.json())
    .then((Seguidores)=>{
        console.log(Seguidores,'RES.JSON');
        let html="";

        for(let i=0;i<Seguidores.length;i++){
            const fotos =Seguidores[i].foto;
            const Nombres=Seguidores[i].Nombre;
            const Apellidos=Seguidores[i].Apellido;
            const idu=Seguidores[i].idUsuarios;
            const idUsuariosD=Seguidores[i].idUsuariosD;
            console.log(`idSeguidores verifica ${idUsuariosD}`);
            html=html+`
            <div class="Siguiendo">
            <div class="FotoPerfil">
            <img src="${fotos}">
            </div>
            <div class="DatosPerfiles">
            <p>${Nombres} ${Apellidos}</p>
            <button onclick="Dejarseguir(${idUsuariosD})">Dejar de seguir</button>
        </div>
        </div>
            
            `
            Perfil.innerHTML=html;

        }
    })
        

}

function Seguidores(){
    const idUsuariosD=parseInt(idUsuario);
    const MostrarSeguidores=document.getElementById("muestra");
    fetch(`http://localhost:3000/SeguidoresSigen/${idUsuariosD}`)
    .then(res=>res.json())
    .then((SeguidresMostra)=>{
        let i=0;
        let html="";
        for(i;i<SeguidresMostra.length;i++){
            const Nombres=SeguidresMostra[i].Nombre;
            const Apellidos=SeguidresMostra[i].Apellido;
            const fotos=SeguidresMostra[i].foto;
            const idUsuariosO=SeguidresMostra[i].idUsuariosO;

            html=html+`   
            <div class="Siguiendo">
            <div class="FotoPerfil">
            <img src="${fotos}">
            </div>
            <div class="DatosPerfiles">
            <p>${Nombres} ${Apellidos}</p>
            <button onclick="seguirTambien(${idUsuariosO})">seguir tambien</button>
        </div>
        </div>

            
            `
            Perfil.innerHTML=html;
        }
        
    })

}


function seguirTambien(idUsuarios){
    const idUsuariosActual=parseInt(idUsuario);
    const idUsuariosSegundo=parseInt(idUsuarios);
    console.log(`primero ${idUsuariosActual} segundo ${idUsuariosSegundo}`)
    
    fetch("http://localhost:3000/SeguirV")
    .then(res=>res.json())
    .then((SeguirValidar)=>{
        let Verdader=false;
       for(let i=0;i<SeguirValidar.length;i++){
        const Seguidores=SeguirValidar[i].idUsuariosO;
        const Seguidores2=SeguirValidar[i].idUsuariosD;
       
       }
        
                SeguirTambienInsertar(idUsuarios);
                const usuarioElement = document.getElementById(`usuario-${idUsuarios}`);
                if (usuarioElement) {
                    usuarioElement.remove();
                }

            
        
            })



}

function SeguirTambienInsertar(idUsuarios){
    const idUsuariosO=idUsuario;
    const idUsuariosD=idUsuarios;
    const Estado='Amigos';
    
   
            fetch('http://localhost:3000/seguirUsuarios',{
                method:"POST",
                headers:{
                  "Content-Type": "application/json",
              },
  
              
              body: JSON.stringify({Estado,idUsuariosO,idUsuariosD}),
          })
          .then((res)=>res.json())
          .then((json)=>{
         
           ActualisaEstado(idUsuarios);
                  })
                
                  .catch((error)=>{
                      console.error("Error al seguir",error);
                  })
                
        


}
//funcion actualiza estado {
    function ActualisaEstado(idUsuarios){
        const idUsuariosD=parseInt(idUsuario);
        const idUsuariosO=parseInt(idUsuarios);
        const Estado='Amigos';
        
                fetch(`http://localhost:3000/actualizarEstado/${idUsuariosO}/${idUsuariosD}`,{
                    method:"PUT",
                    headers:{
                      "Content-Type": "application/json",
                  },
      
                  
                  body: JSON.stringify({Estado}),
              })
              .then((res)=>res.json())
              .then((json)=>{
                fetch(`http://localhost:3000/SeguidoresSigen/${idUsuariosD}`)
                .then(res=>res.json())
                .then((Seguidor)=>{
                    if(Seguidor.length===0){
                        actualizarPagina();
                      
                    }else{
                        
                        Seguidores();
                       
                    
                    }})
                      })
                    
                      .catch((error)=>{
                          console.error("Error al ACtualizar Estado",error);
                      })
                    
            
    
    
    }

//function amigos
function Amigos(){
    const idUsuarios=parseInt(idUsuario);
    fetch(`http://localhost:3000/AmigosM/${idUsuarios}`)
    .then(res=>res.json())
    .then((AmigosM)=>{
        let i=0;
        let html="";
        for(i;i<AmigosM.length;i++){
            const Nombres=AmigosM[i].Nombre;
            const Apellidos=AmigosM[i].Apellido;
            const fotos=AmigosM[i].foto;
            const idUsuariosO=AmigosM[i].idUsuariosO;

            html=html+`   
            <div class="Siguiendo">
            <div class="FotoPerfil">
            <img src="${fotos}">
            </div>
            <div class="DatosPerfiles">
            <p>${Nombres} ${Apellidos}</p>
            
        </div>
        </div>

            
            `
            Perfil.innerHTML=html;
        }
        
    })

}

//funcion amigos etiquetar 
function AmigosEtiquetar(){
    const EtiquetaAmigo=document.getElementById("amigos");
    const idUsuarios=parseInt(idUsuario);
    fetch(`http://localhost:3000/AmigosM/${idUsuarios}`)
    .then(res=>res.json())
    .then((AmigosM)=>{
        let i=0;
        let html="";
        for(i;i<AmigosM.length;i++){
            const Nombres=AmigosM[i].Nombre;
            const Apellidos=AmigosM[i].Apellido;
            const fotos=AmigosM[i].foto;
            const idUsuariosO=AmigosM[i].idUsuariosO;
            console.log("Mensaje que quiero ver",idUsuariosO);

            html=html+`   
            <div class="Siguiendo">
            <div class="FotoPerfil">
            <img src="${fotos}">
            </div>
            <div class="DatosPerfiles">
            <p>${Nombres} ${Apellidos}</p>
            <button onclick="IdEtiquetado(${idUsuariosO})">Etiquetar</button>
            
        </div>
        </div>

            
            `
            EtiquetaAmigo.innerHTML=html;
        }
        
    })

}

function ObteneridMaxPublicacion(){
    fetch("http://localhost:3000/idmax")
    .then((res)=>res.json())
    .then((idMax)=>{
        for(let i=0;i<idMax.length;i++){
            const idPubli=idMax[i].id;
            const idPublicaciones=idPubli+1;
            sessionStorage.setItem('id',idPublicaciones);

        }
    })
}

//funcion validad si es publicacion nuevo o etiquetada nueva
function PublicacionEtiquetada(){
    const idUsuariosD = sessionStorage.getItem('nulo');
    console.log('Está en la función validar', idUsuariosD);
    
    
    if (idUsuariosD===null) {
      CrearPublicacion();
    } else {
      CrearPublicacion();
      EtiquetarInsertar(idUsuariosD);
      sessionStorage.removeItem('nulo');
    }
    
}

function IdEtiquetado(idUsuariosO){
    
    const id=parseInt(sessionStorage.getItem('id'));
    console.log('Este es el id etiqueta',idUsuariosO);
    console.log('idPublicaciones con la suma ',id)
    sessionStorage.setItem('nulo',idUsuariosO);
    console.log('ahora el valor cambio',idUsuariosO);
    const midiv=document.getElementById('Div-Flotante').style.display="none";

}
//funcion Eqtiqueta insertar
function EtiquetarInsertar(id){
    const idUsuariosD=id;
    const idUsuariosO=idUsuario;
    const idPublicaciones=sessionStorage.getItem('id');
    fetch("http://localhost:3000/EtiquetaInsertar",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
      },

      
      body: JSON.stringify({idPublicaciones,idUsuariosO,idUsuariosD}),
  })
  .then((res)=>res.json())
  .then((json)=>{
    alert("Etiquetado con exito")
    
  
          })
        
          .catch((error)=>{
              console.error("Error al ACtualizar Estado",error);
          })
}
 //obtiene fecha y hora actual
const obtenerFechaYHoraActual = () => {
    const ahora = new Date();
    const fechaYHora = ahora.toISOString().slice(0, 19).replace('T', ' ');
    return fechaYHora;
}
//Muestra el perfil del usuairo 
function PerfilUsuario(){
    const fotoActua=sessionStorage.getItem('foto');
    let html="";
    const PerfilU=document.getElementById("Muestra");
    html=html+ `
              
                <div class="miPerfil">
                  <div class="miPerfilFoto">
                  
                  <div class="miPerfilFoto_Nombre">
                  
                  <button onclick="ActualizaPerfil()"><img src="${fotoActua}"></button>
                  <button id="Actualizar" class="Actualizar" onclick="ActualizaFotoPerfil()" style="display: none;">Actualizar</button>
                  </div>
                  <div class="miPerfilNombre">
                  <h2>${nombreUsuario}  ${apellidoUsuario}</h2>
                    
                  </div>
                  </div>
                  <div class="PublicacionesPerfil" id="PublicacionesPerfil">
                  </div>
                  
                    
                </div>
              
    `
PerfilU.innerHTML=html;
PublicacionesPerfilUsuario();

}
//funcion que jalar foto Perfil

function ActualizaPerfil(){
    var imageUrl = null;
    
                var myWidget = cloudinary.createUploadWidget({
                    cloudName: 'dn0l6f8vr',
                    uploadPreset: 'm7lawl2h'
                }, (error, result) => {
                    if (!error && result && result.event === "success") {
                        imageUrl = result.info.secure_url;
                        document.getElementById('Actualizar').style.display = 'block';
                        sessionStorage.setItem('foto',imageUrl);
                       
                        
                    }
                });
    
                myWidget.open();
            };

            //funcion actualiza foto perfil url base de datos 
function ActualizaFotoPerfil(){
    
    const foto=sessionStorage.getItem('foto');
    const idUsuarios=parseInt(idUsuario);
    
    fetch(`http://localhost:3000/ActualizarPerfil/${idUsuario}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",

          
      },

      
      body: JSON.stringify({foto}),
  })
  .then((res)=>res.json())
  .then((json)=>{
   
    alert("Foto Actualizada Exitosamente")
    document.getElementById('Actualizar').style.display = 'none';
    PerfilUsuario();
    muestra();
    
    
    
  
          })
        
          .catch((error)=>{
              console.error("Error al ACtualizar Estado",error);
          })
}

document.addEventListener("DOMContentLoaded",ev=>PublicacionesUsuarioInicio());


function PublicacionesUsuarioInicio(){
    const PubicacionesPerfil=document.getElementById("Publicaciones-inicio");
    const idUsuariosInicio=parseInt(idUsuario);
    fetch(`http://localhost:3000/PublicacionesTodas/${idUsuariosInicio}`)
    .then((res=>res.json()))
    .then((PuPerfil)=>{
        let i=0;
        let html="";

        for(i;i<PuPerfil.length;i++){
            
            const idPublicaciones=PuPerfil[i].idPublicaciones;
            const fotos=PuPerfil[i].foto;
            const Nombres=PuPerfil[i].Nombre;
            const Apellidos=PuPerfil[i].Apellido;
            const fecha=PuPerfil[i].Fecha;
            const descripciones=PuPerfil[i].Descripcion;
            const imagenes=PuPerfil[i].imagen;
            const Nombre2=PuPerfil[i].NombreUsuarioD;
            const Apellido2=PuPerfil[i].ApellidoUsuarioD;
            html=html+` 
             <div class="publicar">
                
                <div class="DatosPubli">
                    <div class="PubliPer_foto">
                      <img src="${fotos}">
                    
                    </div>
                    <div class="DatosPubli_Nombre">
                        <h5>${Nombres} ${Apellidos}</h5>
                        <p>${Nombre2} ${Apellido2}</p>
                    </div>
                </div>

                <div class="Publica_Datos">
                <div class="Publica_Datos2">
                <h4>${descripciones}</h4>
                <img src="${imagenes}"> 
                <button onclick="OptenerComentarios(${idPublicaciones})">Comentarios</button>
                </div>
                <div class="Comentarios" id="Comentarios-${idPublicaciones}"></div>
                
              </div>
            
             </div>
             
            
            `
            PubicacionesPerfil.innerHTML=html;
            console.log(imagenes);

        }
    })
}
//funcion carga publicaciones de perfil 
function PublicacionesPerfilUsuario(){
    const PubicacionesPerfil=document.getElementById("PublicacionesPerfil");
    const idUsuariosInicio=parseInt(idUsuario);
    fetch(`http://localhost:3000/PublicacionesTodas/${idUsuariosInicio}`)
    .then((res=>res.json()))
    .then((PuPerfil)=>{
        let i=0;
        let html="";

        for(i;i<PuPerfil.length;i++){
            
            const idPublicaciones=PuPerfil[i].idPublicaciones;
            const fotos=PuPerfil[i].foto;
            const Nombres=PuPerfil[i].Nombre;
            const Apellidos=PuPerfil[i].Apellido;
            const fecha=PuPerfil[i].Fecha;
            const descripciones=PuPerfil[i].Descripcion;
            const imagenes=PuPerfil[i].imagen;
            const Nombre2=PuPerfil[i].NombreUsuarioD;
            const Apellido2=PuPerfil[i].ApellidoUsuarioD;
            html=html+` 
             <div class="publicar">
                
                <div class="DatosPubli">
                    <div class="PubliPer_foto">
                      <img src="${fotos}">
                    </div>
                    <div class="DatosPubli_Nombre">
                        <h5>${Nombres} ${Apellidos}</h5>
                        
                        <p>${Nombre2} ${Apellido2}</p>
                    </div>
                </div>

                <div class="Publica_Datos">
                <div class="Publica_Datos2">
                <h4>${descripciones}</h4>
                <img src="${imagenes}">
                <button onclick="OptenerComentarios(${idPublicaciones})">Comentarios</button>
                </div>
                </div>
                <div class="Comentarios" id="Comentarios-${idPublicaciones}"></div>
                
              </div>
            
             </div>
             
            
            `
            PubicacionesPerfil.innerHTML=html;
           

        }
    })
}
///funcion que obtiene comentarios 


function OptenerComentarios(idPublicaciones){
    const divComentariso=document.getElementById("Comentarios-"+idPublicaciones);
    divComentariso.style.display="block";
    const idPubli=parseInt(idPublicaciones);

    const ComentariosMostra = document.getElementById("Comentarios-" + idPublicaciones);
        fetch(`http://localhost:3000/Publicacion/${idPubli}`)
        .then(res=>{
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 404) {
                let html="";
                html=html+`
                <input class="Comentar" type="text" name="Comentario" id="Comentario-${idPublicaciones}">
                <button onclick="Comentar(${idPublicaciones})">Comentar</button>
                <button onclick="Salir(${idPublicaciones})">Salir Comentarios</button>
               
               </div> `
                
    
                ComentariosMostra.innerHTML=html;
            } else {
                throw new Error("Error en la solicitud");
            }
        })
        .then((PublicacionesComentarios)=>{
            console.log(PublicacionesComentarios);
            let html="";
    
            for(let i=0;i<PublicacionesComentarios.length;i++){
                const idPublicacion=PublicacionesComentarios[i].idPublicaciones;
                const Nombre=PublicacionesComentarios[i].Nombre;
                const Apellido=PublicacionesComentarios[i].Apellido;
                const fotos=PublicacionesComentarios[i].foto;
                const comentario=PublicacionesComentarios[i].Comentario;
                html=html+`
                 <div class="ComentariosM">
                    <div class="ComentariosDatos">
                        <div class="Comentarios_foto">
                        <img src="${fotos}">
                        </div>

                        <div class="Comentarios_Nombre">
                            <h5>${Nombre} ${Apellido}</h5>
                            <p>${comentario}</p>
                        </div>
                  </div>
                    <div class="ComentarioP">
                    

                    </div>
                
                    
                `
                ComentariosMostra.innerHTML=html;


                
            }
            html=html+`
            <input class="Comentar" type="text" name="Comentario" id="Comentario-${idPublicaciones}">
            <button onclick="Comentar(${idPublicaciones})">Comentar</button>
            <button onclick="Salir(${idPublicaciones})">Salir Comentarios</button>
           </div> `
            

            ComentariosMostra.innerHTML=html;
        });
    
}

function Salir(idPublicaciones){
    const divComentariso=document.getElementById("Comentarios-"+idPublicaciones);
    divComentariso.style.display="none";

}
//funcion comentar publicacion propia 
function Comentar(idPublicaciones){
    const ComentarioAgregar=document.getElementById("Comentario-"+ idPublicaciones);
    const Comentario=ComentarioAgregar.value;
    const idUsuarios=idUsuario;
    console.log(idPublicaciones)
    console.log(Comentario,idPublicaciones,idUsuario);
    
  if(!Comentario){
    alert('Agrega Algo al Comentario ')
  }else{
    fetch("http://localhost:3000/Comentario",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({Comentario,idPublicaciones,idUsuarios})
    })
    .then((res)=>res.json())
    .then((ComentarioInsert)=>{
        console.log("Comentario exitoso")
        ComentarioAgregar.value="";
        OptenerComentarios(idPublicaciones);
    })
    .catch((error)=>{
        console.error("Erorr al comentar",error)
    })
  }
    


}
function Gmail(){
    const FechaCreacion=obtenerFechaYHoraActual();


// Asigna la ruta de la imagen al atributo src
let foto= '../img/Perfil.png';
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

            
            body: JSON.stringify({foto,Nombre,Apellido,Correo,FechaCreacion,Contrasena}),
        })
        .then((res)=>res.json())
        .then((json)=>{
            NombreRe.value="";
            ApellidoRe.value="";
            CorreoRe.value="";
            contrasenaRe.value="";
                })
                .catch((error)=>{
                    console.error("Error al registrar",error);
                })
                    
                }
            })
            

        }
}

function SubirImagen(){
    var imageUrl = null;
    
                var myWidget = cloudinary.createUploadWidget({
                    cloudName: 'dn0l6f8vr',
                    uploadPreset: 'm7lawl2h'
                }, (error, result) => {
                    if (!error && result && result.event === "success") {
                        imageUrl = result.info.secure_url;
                        console.log('Imagen seleccionada:', imageUrl);
                        sessionStorage.setItem('Imagen',imageUrl);
                       
                        
                    }
                });
    
                myWidget.open();
            };

function CrearPublicacion(){
    
    const imagen=String(sessionStorage.getItem('Imagen'));
    console.log(imagen);
    const Fecha=obtenerFechaYHoraActual();
    const idUsuarios=idUsuario;
    const DescripcionJ=document.getElementById("Descripcion");
    const Descripcion=DescripcionJ.value;
    if(!Descripcion||!imagen){

        alert(
            "Completa la publicación"
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
            ObteneridMaxPublicacion();//se actualiza para obtener id max publicacion

            
                })
                .catch((error)=>{
                    console.error("Error al reguistrar",error);
                })
                    
            }
            }

//Datos de perfil
function DatosPerfil(){
    fetch(`http://localhost:3000/UsuariosRed/${idUsuario}`)
    .then(res=>res.json())
    .then((DatosPerdfil)=>{
        console.log(DatosPerdfil,'RES.JSON');
        let Nombre=[],Apellido=[];
        let html="";
        for(let i=0;i<DatosPerdfil.length;i++){
            const fotos=DatosPerdfil[i].foto;
            Nombre[i]=DatosPerdfil[i].Nombre;
            Apellido[i]=DatosPerdfil[i].Apellido;
            const idUsuarios=DatosPerdfil[i].idUsuarios;
            
            html=html+`
            <div class="Siguiendo" id="Siguiendo">
            <div class="FotoPerfil">
            <img src="${fotos}">
            </div>
            <div class="DatosPerfiles">
            <p>${Nombre[i]} ${Apellido[i]}</p>
            <button onclick="Seguir(${idUsuarios})">Seguir</button>
        </div>
        </div>
            `;
            Perfil.innerHTML=html;
            

            }
        
       
    })


};

//funcion para dejar de seguir

function Dejarseguir(idUsuariosD){
    const idUsuariosO=parseInt(idUsuario);
    const idUsuariosSegundo=parseInt(idUsuariosD);
    console.log(`primero ${idUsuariosO} segundo ${idUsuariosSegundo}`);
    fetch(`http://localhost:3000/EliminarSiguiendo/${idUsuariosO}/${idUsuariosSegundo}`,{
       method: 'DELETE',
       headers:{
        "Content-Type": "application/json",}
    })
    .then(Eliminado=>{
                if (Eliminado.ok) {
                    alert("Seguidor eliminado con éxito.");
                    fetch(`http://localhost:3000/seguidores/${idUsuario}`)
                    .then(res=>res.json())
                    .then((UsuarioSe)=>{
                        if(UsuarioSe.length===0){
                            actualizarPagina();
                        }else{
                            Siguiendo();
                        }
                    })


                } else {
                    alert("No se pudo eliminar el seguidor.");
                }
               
          
      
            
       
    })
    .catch((e)=>{
        console.error('Error',e);
    })
    

}
function Seguir(idUsuarios){
    const idUsuariosActual=parseInt(idUsuario);
    const idUsuariosSegundo=parseInt(idUsuarios);
    
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
                
                const usuarioElement = document.getElementById(`usuario-${idUsuarios}`);
                if (usuarioElement) {
                    usuarioElement.remove();

                }

            }
        
            })



}
//funcion seguir 
function SeguirInsertar(idUsuarios){
    const idUsuariosO=idUsuario;
    const idUsuariosD=idUsuarios;
    const Estado='Siguiendo';
    
            fetch('http://localhost:3000/seguirUsuarios',{
                method:"POST",
                headers:{
                  "Content-Type": "application/json",
              },
  
              
              body: JSON.stringify({Estado,idUsuariosO,idUsuariosD}),
          })
          .then((res)=>res.json())
          .then((json)=>{
            alert("Siguiendo")
            fetch(`http://localhost:3000/UsuariosRed/${idUsuario}`)
                    .then(res=>res.json())
                    .then((SeguirValidar)=>{
                        if(SeguirValidar.length===0){
                            actualizarPagina();
                        }else{
                            
                            DatosPerfil();
                        
                        }})
          
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
 
