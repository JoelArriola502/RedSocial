const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joelarriola',
    database: 'RedSocial'
});


// Conectar a la base de datos
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


module.exports = conexion;