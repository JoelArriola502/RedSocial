const url="http://localhost:3000/Mostrar";
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
    const gmail1=gmail.value;
    const contra1=contra.value;
    fetch("http://localhost:3000/obtenerUsuario")
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





const formulario = document.getElementById('formulario');
        const resultado = document.getElementById('resultado');

        formulario.addEventListener('submit', function (e) {
            e.preventDefault();

            const Correo = document.getElementById('Correo').value;
            const Contrasena = document.getElementById('Contra').value;

            fetch('http://localhost:3000/obtenerUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Correo, Contrasena })
            })
            .then(response => response.json())
            .then(data => {
                resultado.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                resultado.textContent = 'Error: ' + error;
            });
        });


        function iniciarSesion() {
            const correo = document.getElementById('Correo').value;
            const contrasena = document.getElementById('Contra').value;
        
            fetch('http://localhost:3000/obtenerUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contrasena })
            })
            .then(response => response.json())
            .then(data => {
                const resultadoIngreso = document.getElementById('resultadoIngreso');
                resultadoIngreso.innerHTML = `
                    <h3>Resultado de Inicio de Sesión</h3>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            })
            .catch(error => {
                console.error('Error al iniciar sesión: ' + error);
            });
        }
        