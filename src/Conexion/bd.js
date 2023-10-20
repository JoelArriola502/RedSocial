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

    function CrearUsuarios(Nombre, Apellido, Correo,Contrasena){
        return knex(Usuarios).insert({
            Nombre: Nombre,
            Apellido: Apellido,
            Correo:Correo,
            Contrasena: Contrasena
        });
    };
    //usuario por id
    function MostrarUsuariosid(idUsuarios){
        return knex(Usuarios).where('idUsuarios',idUsuarios).first();

    }


    function obtenerUsuarioPorCredenciales(correo, contrasena) {
        return knex.select('Nombre', 'Apellido')
            .from('Usuarios')
            .where({
                Correo: correo,
                Contrasena: contrasena
            });
    }
    

    return {mostrarUsuarios,CrearUsuarios,MostrarUsuariosid,obtenerUsuarioPorCredenciales};
};



module.exports = databaseService;
