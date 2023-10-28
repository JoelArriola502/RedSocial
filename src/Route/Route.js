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
                NuevoUsuario.foto,
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
        NuevoSeguidor.Estado,
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
    

    
    // con comentario
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

    //publicaciones sin comentarios 
    app.get('/PublicacionesPerfil/:idUsuarios',(req,res)=>{
        const idUsuarios=req.params.idUsuarios;
        databaseService.PublicacionesPerfil(idUsuarios)
        .then(response=>res.json(response))
        .catch((e)=>res.status(500).json(e))
    })
    



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

    //funcion Seguidores seguidos quitar
    app.get('/Seguidorq/:idUsuariosO',(req,res)=>{
        const idUsuariosO=req.params.idUsuariosO;
        databaseService.SeguidoresSegidos(idUsuariosO)
        .then(response=>{
            if(response){
                res.json(response);
            }else{
                res.status(404).json("No esta el usuario")
            }
        }).catch((error)=>{
            res.status(500).json(error)
        })
    })

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

    ///metodo post para comentario propio

    app.post('/Comentario',(req,res)=>{
        const ComentarioP=req.body;
        databaseService.ComentarioPropio(
            ComentarioP.Comentario,
            ComentarioP.idPublicaciones,
            ComentarioP.idUsuarios
        )
        .then(()=>{
            res.json({message:"Comentario exitoso"})
        }).catch(error=>{
            res.status(500).send(error)
        })
    })

    //funcion que mustra los usuarios que te estan siguiendo 
    app.get('/SeguidoresSigen/:idUsuariosD',(req,res)=>{
        const idUsuariosD=req.params.idUsuariosD;
        databaseService.SeguidoresSiguiendote(idUsuariosD)
        .then(response=>{
            if(response){
                res.json(response);
            }else{
                res.status(404).json("No esta el usuario")
            }
        }).catch((error)=>{
            res.status(500).json(error)
        })
    })


    //metodo get mostrar amigos 
    app.get('/AmigosM/:idUsuariosD', (req, res) => {
        const idUsuariosD=req.params.idUsuariosD;
        databaseService.MostrarAmigos(idUsuariosD)
            .then(response => res.json(response))
            .catch(e => res.status(500).send(e));
    });

    //metdodo put actualizar estado 
    app.put('/actualizarEstado/:idUsuariosO/:idUsuariosD', (req, res) => {
        const idUsuariosO = req.params.idUsuariosO;
        const idUsuariosD = req.params.idUsuariosD;
        const actualizar=req.body;
    
        databaseService.actualizarEstado(actualizar.Estado,idUsuariosO,idUsuariosD
             )
            .then(() => {
                res.json({ message: 'Estado actualizado exitosamente' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'No se pudo actualizar El estado', details: error });
            });
    });

    //metodo put actualizar foto perfil
    app.put('/ActualizarPerfil/:idUsuarios',(req,res)=>{
        const idUsuarios=req.params.idUsuarios;
        const ActualizarP=req.body;
        databaseService.ActualizarFoto(idUsuarios,
            ActualizarP.foto)
            .then(()=>{
                res.json({message:"Foto Perfil Actualizada Correctamente"})

            }).catch((error)=>{
                res.status(500).json({error: "Nos es Posible Actualizar la foto",details:error})
            })

    })


      //metodo get mostrar ultimo id 
      app.get('/idmax', (req, res) => {
       
        databaseService.idPublicacionesInsertar()
            .then(response => res.json(response))
            .catch(e => res.status(500).send(e));
    });


    //metodo post Etiquetas
    app.post('/EtiquetaInsertar',(req,res)=>{
        const EtiquetarInsert=req.body;
        databaseService.EtiquetaInsertar(
            EtiquetarInsert.idPublicaciones,
            EtiquetarInsert.idUsuariosO,
            EtiquetarInsert.idUsuariosD
        )
        .then(()=>{
            res.json({message: "Etiqueta insertarda Correctamente"});
        }).catch((e)=>{
            res.status(500).json(e)
        })
    })


    app.get('/UsuariosRed/:idUsuarios',(req,res)=>{
        const idUsuarios=req.params.idUsuarios;
        databaseService.UsuariosRed(idUsuarios)
        .then(response=>res.json(response))
        .catch((e)=>res.status(500).json(e))
    })

    app.get('/PublicacionesTodas/:idUsuariosO',(req,res)=>{
        const idUsuariosO=req.params.idUsuariosO;
        databaseService.PublicacionesEtiquetadas(idUsuariosO)
        .then((response)=>{
           const DejarLimpio=response.map((row)=>({
            ...row,
                NombreUsuarioD: row.NombreUsuarioD || '',
                ApellidoUsuarioD: row.ApellidoUsuarioD || '',
           }));
           res.json(DejarLimpio);

        }).catch((error)=>{
            res.status(500).json({error: "Nos es Posible Actualizar la foto",details:error})
        })
    })

};