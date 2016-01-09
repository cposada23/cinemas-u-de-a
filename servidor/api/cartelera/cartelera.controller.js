var carteleras = require('./cartelera.modelo');

/**
 * Obtener la lista de cinemas
 */
 
exports.carteleras=function (req,res) {
    carteleras.find({},'cineId _id', function (err, carteleras) {
        if(err)return handleError(res, err);
        return res.status(200).json(carteleras);
    })
}
 
exports.cartelera = function (req,res) {
    var idCartelera = req.params.cartelera;
    var idCine = req.params.idcine;
    carteleras.findOne({cineId:idCine, _id:idCartelera} ,function (err,cartelera) {
        if (err){return handleError(res,err);}
        if (cartelera.length===0){return res.status(404).json({err:'Cartelera no encontrada'});}
        return res.status(200).json(cartelera);
        
    });
};


exports.create = function (req,res) {
    
    var cartelera1 = new carteleras({
        
        cineId:"568321917e45909317e9c398",
        fechaFin: new Date("2016 , 2,2"),
        peliculas:[{
            idPelicula:"568f12f88c404c302c7fe956",
            nombrePelicula:"Sinsajo",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/sinsajo.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94a",
            nombrePelicula:"Principito",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/Principito.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94e",
            nombrePelicula:"Marte",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/marte.jpg"
        }]
        
    });
    
    cartelera1.save(function (err) {
        if (err)return handleError(res,err);
        console.log("cartelera 1 creada");
    });
    
    var cartelera2 = new carteleras({
        
        cineId:"568321917e45909317e9c399",
        fechaFin: new Date("2016 , 2,2"),
        peliculas:[{
            idPelicula:"568f12f88c404c302c7fe956",
            nombrePelicula:"Sinsajo",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/sinsajo.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94a",
            nombrePelicula:"Principito",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/Principito.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94e",
            nombrePelicula:"Marte",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/marte.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe952",
            nombrePelicula:"REC",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/rec.jpg"
        }]
        
    });
    
    cartelera2.save(function (err) {
        if (err)return handleError(res,err);
        console.log("cartelera 2 creada");
    });
    
    var cartelera3 = new carteleras({
        
        cineId:"568321917e45909317e9c39a",
        fechaFin: new Date("2016 , 2,2"),
        peliculas:[{
            idPelicula:"568f12f88c404c302c7fe956",
            nombrePelicula:"Sinsajo",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/sinsajo.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94a",
            nombrePelicula:"Principito",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/Principito.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe94e",
            nombrePelicula:"Marte",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/marte.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe95a",
            nombrePelicula:"En el corazón del mar",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/ElCorazonDelmar.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe95f",
            nombrePelicula:"Victor Frankenstein",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/VF.jpg"
        },{
            idPelicula:"568f12f88c404c302c7fe952",
            nombrePelicula:"REC",
            imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/rec.jpg"
        }]
        
    });
    
    cartelera3.save(function (err) {
        if (err)return handleError(res,err);
        console.log("cartelera 3 creada");
    });
    return res.status(200).json({creada:'creadas'});
}


function handleError(res, err) {
    return res.status(500).send(err);
};


/**
 * para crear carteleras
 */
 /* carteleras.create({
        documento: "102d2338",
        tipoDoc: "cc",
        nombres: "q",
        apellidos: "p",
        email: "q",
        password: "q", 
        sexo:"masculino",
        barrio:"laureew",
        direccion:"caller 1qq01!",
        generoPelicula:"terror",
    }, function(){
        console.log("creado");
    })*/