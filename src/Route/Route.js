module.exports = (app, databaseService)=> {

    app.get('/Mostrar', (req, res) => {
        databaseService.mostrarUsuarios()
            .then(response => res.json(response))
            .catch(e => res.status(500).send(e));
    });

    app.post('/prue', (req, res) => {
        const NuevoUsuario = req.body;
        console.log(NuevoUsuario);
        databaseService
            .CrearUsuarios(
                NuevoUsuario.Nombre,
                NuevoUsuario.Apellido,
                NuevoUsuario.Correo,
                NuevoUsuario.Contrasena)
            .then(() => {
                res.json({ message: "Usuario Agregado exitosamnete!" });
            }).catch(e => {
                res.status(500).send(e);
            });
    });


    //funcion de consulta 
    app.get('/consulta', (req, res) => {
        databaseService.ConsultaTodos()
            .then(response => res.json(response))
            .catch(e => res.status(500).send(e));
    });
//id
    app.get('/Mostrar/:id', (req, res) => {
        const idUsuarios = req.params.id;

        databaseService.MostrarUsuariosid(idUsuarios)
            .then(lenguaje => {
                if (lenguaje) {
                    res.json(lenguaje);
                } else {
                    res.status(404).send("Lenguaje no encontrado");
                }
            })
            .catch(e => res.status(500).send(e));
    });

    //obtener datos credenciales
    app.post('/obtenerUsuario', (req, res) => {
        const buscar = req.body;
    
        databaseService.obtenerUsuarioPorCredenciales(buscar.Correo,
             buscar.Contrasena)
            .then((result) => {
                if (result.length > 0) {
                    const usuario = result[0]; // Tomar el primer resultado (puede haber solo uno)
                    res.json(usuario);
                } else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'No se pudo obtener el usuario', details: error });
            });
    });
    


};