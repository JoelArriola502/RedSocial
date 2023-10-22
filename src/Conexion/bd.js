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


    function mostrarUsuarios(){
        return knex(Usuarios).select();
    };

    function CrearUsuarios(Nombre, Apellido, Correo,FechaCreacion,Contrasena){
        return knex(Usuarios).insert({
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
        return knex.select('u.idUsuarios','u.Nombre','u.Apellido','s.idUsuariosO')
        .from('Usuarios as u')
        .join('Seguidores as s','u.idUsuarios','s.idUsuariosD')
        .where('s.idUsuariosO',idUsuariosO)

    }

    function obtenerPublicacionConComentarios(idPublicacion) {
        return knex.select('p.Descripcion', 'c.Comentario', 'u.Nombre', 'u.Apellido')
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
    function SeguirUsuarios(idUsuariosO,idUsuariosD){
        return knex(Seguidores).insert({
            idUsuariosO: idUsuariosO,
            idUsuariosD: idUsuariosD
        })

    }
    function SeguidoresValidar(){
        return knex(Seguidores).select();
        
    }

    return {mostrarUsuarios,CrearUsuarios,CrearPublicacion,MostrarUsuariosid,
        obtenerUsuarioPorCredenciales,MostrarSeguidores,obtenerPublicacionConComentarios,
        ExcluyeUsuario,SeguirUsuarios,SeguidoresValidar};
};



module.exports = databaseService;
