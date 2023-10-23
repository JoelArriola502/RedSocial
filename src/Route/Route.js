const { response } = require("express");

module.exports = (app, databaseService)=> {

    app.get('/Mostrar', (req, res) => {
        databaseService.mostrarUsuarios()
            .then(response => res.json(response))
            .catch(e => res.status(500).send(e));
    });

    app.post('/Nuevousuario', (req, res) => {
        const NuevoUsuario = req.body;
        console.log(NuevoUsuario);
        databaseService
            .CrearUsuarios(
                NuevoUsuario.Nombre,
                NuevoUsuario.Apellido,
                NuevoUsuario.Correo,
                NuevoUsuario.FechaCreacion,
                NuevoUsuario.Contrasena)
            .then(() => {
                res.json({ message: "Usuario Agregado exitosamnete!" });
            }).catch(e => {
                res.status(500).send(e);
            });
    });
//metodo post crear publicaciones
app.post('/NuevaPublicacion',(req,res)=>{
    const NuevaPublicacion=req.body;
    databaseService.CrearPublicacion(
        NuevaPublicacion.Descripcion,
        NuevaPublicacion.Fecha,
        NuevaPublicacion.imagen,
        NuevaPublicacion.idUsuarios)
    .then(()=>{
        res.json({message: "Publicacion Agregada Con exito"})
    }).catch(e=>{
        res.status(500).send(e);
    })
})
//funcion post para seguir usuarios

app.post('/seguirUsuarios',(req,res)=>{
    const NuevoSeguidor=req.body;
    databaseService.SeguirUsuarios(
        NuevoSeguidor.idUsuariosO,
        NuevoSeguidor.idUsuariosD
    )
    .then(()=>{
        res.json({message: "Siguiendo a usuario con exito"})
    }).catch(e=>{
        res.status(500).send(e);
    });
})
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
            .then(response => {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).send("Usuario no encontrado");
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
    //funcion Valida usuarios que no sigan otra vez
    app.get('/SeguirV',(req,res)=>{

      databaseService.SeguidoresValidar()
     .then(response=>res.json(response))
     .catch(e=>res.status(500).send(e))
    })

    //funcion seguidores
    app.get('/seguidores/:id',(req,res)=>{
        const idUsuariosO=req.params.id;
        databaseService.MostrarSeguidores(idUsuariosO)
        .then(response=>{
            if(response){
            res.json(response) 
    }else{
        res.status(404).send('Seguidor nadi sigue')
    }})
        
        .catch(e=>res.status(500).send(e))
    

    })
    

    
    
    app.get('/publicacion/:id', (req, res) => {
        const idPublicacion = req.params.id;
    
        databaseService.obtenerPublicacionConComentarios(idPublicacion)
            .then(response => {
                if (response.length > 0) {
                    res.json(response);
                } else {
                    res.status(404).send('Publicación no encontrada');
                }
            })
            .catch(error => {
                res.status(500).send(error);
            });
    });
    



    //excuye usuario
    app.get('/Excluye/:id', (req, res) => {
        const idUsuarios = req.params.id;

        databaseService.ExcluyeUsuario(idUsuarios)
            .then(response => {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).send("Usuario no encontrado");
                }
            })
            .catch(e => res.status(500).send(e));
    });

    //funcion Eliminar seguidor o dejar de seguir 
    app.delete('/EliminarSiguiendo/:idUsuariosO/:idUsuariosD',(req,res)=>{
        const idUsuariosO=req.params.idUsuariosO;
        const idUsuariosD=req.params.idUsuariosD;
        databaseService.ElimimarSeguidor(idUsuariosO,idUsuariosD)
        .then((response)=>{
            if (response) {
                res.json(response);
            } else {
                res.status(404).json("Usuario no encontrado");
            }

        })
        
        .catch((e)=>{
            res.status(500).json({e:'No se puede eliminar',details:e})
        })
    })
};