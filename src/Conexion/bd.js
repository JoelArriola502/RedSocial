const mysql=require("mysql2");
require('dotenv').config();
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME}=process.env;
    const knex = require('knex')({
        client: 'mysql2',
        connection: {
            host : DB_HOST,
            port : 3306,
            user : DB_USER,
            password : DB_PASSWORD,
            database : DB_NAME,
        }
    });
function databaseService(){
    const Publicaciones = 'Publicaciones';
    const Usuarios= 'Usuarios';
    const Seguidores='Seguidores';
    const Etiqueta= 'Etiqueta';
    const Comentarios='Comentarios';


    function mostrarUsuarios(){
        return knex(Usuarios).select();
    };

    function CrearUsuarios(foto,Nombre, Apellido, Correo,FechaCreacion,Contrasena){
        return knex(Usuarios).insert({
            foto: foto,
            Nombre: Nombre,
            Apellido: Apellido,
            Correo:Correo,
            FechaCreacion:FechaCreacion,
            Contrasena: Contrasena
        });
    };
    //funcion crearPublicacion
    function CrearPublicacion(Descripcion,Fecha,imagen,idUsuarios){
        return knex(Publicaciones).insert({
            Descripcion: Descripcion,
            Fecha: Fecha,
            imagen: imagen,
            idUsuarios: idUsuarios
        })
    }
    //usuario por id
    function MostrarUsuariosid(idUsuarios){
        return knex(Usuarios).where('idUsuarios',idUsuarios).first();

    }


    function obtenerUsuarioPorCredenciales(correo, contrasena) {
        return knex(Usuarios)
            .where({
                Correo: correo,
                Contrasena: contrasena
            });
    }
//mustra seguidores usuarios 
    function MostrarSeguidores(idUsuariosO){
        return knex.select('u.idUsuarios','u.foto','u.Nombre','u.Apellido','s.Estado','s.idUsuariosO','s.idUsuariosD')
        .from('Usuarios as u')
        .join('Seguidores as s','u.idUsuarios','s.idUsuariosD')
        .where('s.idUsuariosO',idUsuariosO)
        .andWhere('s.Estado','Siguiendo')

    }

    function obtenerPublicacionConComentarios(idPublicacion) {
        return knex.select('*')
            .from('Publicaciones as p')
            .join('Comentarios as c', 'p.idPublicaciones', 'c.idPublicaciones')
            .join('Usuarios as u', 'c.idUsuarios', 'u.idUsuarios')
            .where('p.idPublicaciones', idPublicacion);
    }
    
//muestra usuarios menos al del perfil 

function ExcluyeUsuario(idUsuarios){
    return knex(Usuarios)
    .where('idUsuarios','<>',idUsuarios);

}
    //funcion seguir 
    function SeguirUsuarios(Estado,idUsuariosO,idUsuariosD){
        return knex(Seguidores).insert({
            Estado: Estado,
            idUsuariosO: idUsuariosO,
            idUsuariosD: idUsuariosD
        })

    }
    function SeguidoresValidar(){
        return knex(Seguidores).select();
        
    }
    function ElimimarSeguidor(idUsuariosO, idUsuariosD) {
        return knex(Seguidores)
            .where('idUsuariosO', idUsuariosO)
            .andWhere('idUsuariosD', idUsuariosD)
            .del();
    }
    
    //funcion que saca los que voy siguiendo 
    function SeguidoresSegidos(idUsuariosO){
        return knex.select('*')
        .from('Usuarios as u')
        .join('Seguidores as s','u.idUsuarios','s.idUsuariosD')
        .where('s.idUsuariosO',idUsuariosO)
    }
    //publicaciones de usuarios 
    function PublicacionesPerfil(idUsuarios){
        return knex('*')
        .from('Usuarios as u')
        .join('Publicaciones as p','u.idUsuarios','p.idUsuarios')
        .where('u.idUsuarios',idUsuarios)

    }
    //funcion para insertar comentario propio
    function ComentarioPropio(Comentario,idPublicaciones,idUsuarios){
        return knex('Comentarios').insert({
            Comentario: Comentario,
            idPublicaciones: idPublicaciones,
            idUsuarios: idUsuarios
        })
    }

    function SeguidoresSiguiendote(idUsuariosD){
        return knex('*')
        .from('Usuarios as u')
        .join('Seguidores as s','u.idUsuarios','s.idUsuariosO')
        .where('s.idUsuariosD',idUsuariosD)
        .andWhere('s.Estado','Siguiendo')


    }
    
                          
      //funcion actualisar de estado siguiendo a estado amigo
      function actualizarEstado(Estado,idUsuariosO, idUsuariosD) {
        return knex('Seguidores')
            .where('idUsuariosO', idUsuariosO)
            .andWhere('idUsuariosD',idUsuariosD)
            .update({
                 Estado: Estado,
            });
    }                    
        /*Funcion Actualiza Foto Perfil*/
        function ActualizarFoto(idUsuarios,foto){
            return knex('Usuarios')
            .where('idUsuarios',idUsuarios)
            .update(({
                foto: foto

            }))

        }

            
    function MostrarAmigos(idUsuariosD){
        return knex.select('*')
        .from('Seguidores  as s')
        .join(' Usuarios as u','s.idUsuariosO','u.idUsuarios')
        .where('s.Estado','Amigos')
        .andWhere('s.idUsuariosD',idUsuariosD)

    }
 

  function idPublicacionesInsertar(){
    return knex.max('idPublicaciones as id')
     .from('Publicaciones')
  }
                          
         
  //funcion Etiquetar
  function EtiquetaInsertar(idPublicaciones,idUsuariosO,idUsuariosD)
  {
    return knex('Etiqueta').insert({
        idPublicaciones: idPublicaciones,
        idUsuariosO: idUsuariosO,
        idUsuariosD: idUsuariosD

    })
  }
            

        function UsuariosRed(idUsuarios) {
            return knex('Usuarios')
              .where('idUsuarios', '<>', idUsuarios)
              .whereNotIn('idUsuarios', function() {
                this.select('idUsuariosD')
                  .from('Seguidores')
                  .where('idUsuariosO', idUsuarios);
              })
              .whereNotIn('idUsuarios', function() {
                this.select('idUsuariosO')
                  .from('Seguidores')
                  .where('idUsuariosD', idUsuarios);
              });
          }

          //u.Nombre AS NombreUsuario, u.Apellido AS ApellidoUsuario,
          function PublicacionesEtiquetadas(idUsuariosO) {
            return knex('Publicaciones as p')
                .select(
                    'p.*',
                    'u.foto',
                    'u.Nombre',
                    'u.Apellido',
                    'uD.Nombre as NombreUsuarioD',
                    'uD.Apellido as ApellidoUsuarioD'
                )
                .join('Usuarios as u', 'p.idUsuarios', 'u.idUsuarios')
                .leftJoin('Etiqueta as e', 'p.idPublicaciones', 'e.idPublicaciones')
                .leftJoin('Usuarios as uO', 'e.idUsuariosO', 'uO.idUsuarios')
                .leftJoin('Usuarios as uD', 'e.idUsuariosD', 'uD.idUsuarios')
                .where(function () {
                    this.where('p.idUsuarios', idUsuariosO)
                        .orWhere('e.idUsuariosO', idUsuariosO)
                        .orWhere('e.idUsuariosD', idUsuariosO);
                })
               
        }
        
        
          

    return {mostrarUsuarios,CrearUsuarios,CrearPublicacion,MostrarUsuariosid,
        obtenerUsuarioPorCredenciales,MostrarSeguidores,obtenerPublicacionConComentarios,
        ExcluyeUsuario,SeguirUsuarios,SeguidoresValidar,ElimimarSeguidor,SeguidoresSegidos,
    PublicacionesPerfil,ComentarioPropio,SeguidoresSiguiendote,actualizarEstado,MostrarAmigos,ActualizarFoto,
    idPublicacionesInsertar,EtiquetaInsertar,UsuariosRed,PublicacionesEtiquetadas};
};



module.exports = databaseService;
