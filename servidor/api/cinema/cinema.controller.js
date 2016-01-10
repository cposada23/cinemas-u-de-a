
var cinemas = require('./cinema.modelo');

var programaciones = require('../programacion/programacion.modelo');
var salas = require('../sala/sala.modelo');
var sillas = require('../silla/silla.modelo');
var funciones = require('../funcion/funcion.modelo');
var peliculas = require('../pelicula/pelicula.modelo');
var boletas = require('../boleta/boleta.modelo');
var precios = require('../precio/precio.modelo');



/**
 * Obtener la lista de cinemas
 */
exports.listar = function (req,res) {
    
    
    /*cinema.find({}).remove(function () {
        console.log("borrados");
    })*/
    cinemas.find({} ,function (err,cines) {
        if (err){return handleError(res,err);}
        return res.status(200).json(cines);
        
    });
};





/**
 * Para llenar la base de datos
 */
 
/**
 * Crear los precios
 */
exports.createprecios = function (req, res) {
    var precioGeneral2D = new precios({
       localidad:"General",
       formato:"2D",
       precioDinero:8000,
       precioPuntos: 50,
       puntosGanados: 8
    });
    precioGeneral2D.save(function (err,precioGeneral2D) {
        if (err)return handleError(res,err);
        console.log("precioGeneral2D creado");
    });
    
    var precioGeneral3D = new precios({
       localidad:"general",
       formato:"3D",
       precioDinero:10000,
       precioPuntos: 80,
       puntosGanados: 10
    });
    precioGeneral3D.save(function (err,precioGeneral3D) {
        if (err)return handleError(res,err);
        console.log("precioGeneral3D creado");
    });
    
    var precioVibrosound2D = new precios({
       localidad:"vibrosound",
       formato:"2D",
       precioDinero:10000,
       precioPuntos: 80,
       puntosGanados: 10
    });
    precioVibrosound2D.save(function (err,precioVibrosound2D) {
        if (err)return handleError(res,err);
        console.log("precioVibrosound2D creado");
    });
    
    var precioVibrosound3D = new precios({
       localidad:"vibrosound",
       formato:"3D",
       precioDinero:13000,
       precioPuntos: 100,
       puntosGanados: 10
    });
    precioVibrosound3D.save(function (err,precioVibrosound3D) {
        if (err)return handleError(res,err);
        console.log("precioVibrosound3D creado");
    });
    
    return res.status(200).json({precios:'creados'});
};
//buscar precios
exports.precios = function (req, res) {
    precios.find(function (err, precios) {
        if (err) return handleError(res, err);
        res.status(200).json(precios);
    });
};
//listar precio por localidad y formato
exports.precio = function (req, res) {
    precios.findOne({localidad: req.params.localidad, formato: req.params.formato} , function (err, precio) {
        if(err)return handleError(res, err);
        return res.status(200).json(precio);
    });
};
 
 
exports.create = function (req,res) {
    
    /**
     * Cinema Monterrey
     */
    var cinema = new cinemas({
       nombre: "Cinemas Monterrey",
       direccion: "Calle 10",
       municipio: "Medellín",
       cartelera: "568f1eab3de0d72b2d0ab4da"
    });
    cinema.save(function (err, cinema) {
        if(err)return handleError(res, err);
        console.log("Cinema creado ....");
        /**
         * programacion1 del cinema
         */
        var progamacion1 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala1 del cinema
         */
         
         
        var sala1 = new salas({
            numero: 1,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala1));
        sala1.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala1" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 1 creada creando la programacion...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion1.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe956'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion1.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion1._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion1.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe956';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion1.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion1._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion1.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe956';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion1.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion1._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion1.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion1);
                                                    
                                                    progamacion1.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 1 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        /**
         * fin creacion sala1 y programacion 1 del cinema 1
         */
         
         
         
        /**
         * programacion2 del cinema 1
         */
        var progamacion2 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala2 del cinema
         */
         
         
        var sala2 = new salas({
            numero: 2,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala2));
        sala2.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala2" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion2.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe94a'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion2.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion2._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion2.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe94a';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion2.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion2._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion2.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94e';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion2.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion2._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion2.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion2);
                                                    
                                                    progamacion2.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 2");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 2 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        
        /**
         * fin creacion sala2 y programacion 2 del cinema 1
         */
         
         
         
        /**
         * programacion3 del cinema 1
         */
        var progamacion3 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala3 del cinema 1
         */
         
         
        var sala3 = new salas({
            numero: 3,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala3));
        sala3.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala3" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion3.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe952'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion3.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion3._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion3.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe952';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion3.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion3._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion3.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94e';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion3.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion3._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion3.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion3);
                                                    
                                                    progamacion3.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 3");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 3 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
         
        setTimeout(function () {
            cinema.save(function (err,cinema) {
                if(err){
                    console.log("Error guardando el cinema 1");
                    return handleError(res,err);
                }
                console.log("cinema 1 guardado correctamente");
                
            });
             
        },30000);
    });
    
    
    /**
     * Fin creacion cinema Monterrey
     */
     
     
    
    /**
     * cinema Premium Plaza
     */
    var cinema2 = new cinemas({
       nombre: "Cinemas Premium Plaza",
       direccion: "Avenida El Poblado",
       municipio: "Medellín",
       cartelera: "568f1eab3de0d72b2d0ab4df"
    });
    cinema2.save(function (err, cinema) {
        if(err)return handleError(res, err);
        console.log("Cinema 2 creado ....");
        /** 
         * programacion1 del cinema 2
         */
        var progamacion1 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala1 del cinema 2
         */
         
         
        var sala1 = new salas({
            numero: 1,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala1));
        sala1.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala1" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 1 creada creando la programacion...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion1.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe956'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion1.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion1._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion1.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe94e';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion1.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion1._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion1.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe952';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion1.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion1._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion1.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion1);
                                                    
                                                    progamacion1.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 1 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        /**
         * fin creacion sala1 y programacion 1 del cinema 1
         */
         
         
         
        /**
         * programacion2 del cinema 2
         */
        var progamacion2 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala2 del cinema 2
         */
         
         
        var sala2 = new salas({
            numero: 2,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala2));
        sala2.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala2" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion2.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe95a'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion2.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion2._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion2.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe95f';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion2.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion2._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion2.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94a';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion2.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion2._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion2.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion2);
                                                    
                                                    progamacion2.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 2");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 2 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        
        /**
         * fin creacion sala2 y programacion 2 del cinema 1
         */
         
         
         
        /**
         * programacion3 del cinema 1
         */
        var progamacion3 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala3 del cinema 1
         */
         
         
        var sala3 = new salas({
            numero: 3,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala3));
        sala3.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala3" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion3.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe95a'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion3.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion3._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion3.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe956';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion3.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion3._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion3.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94a';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion3.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion3._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion3.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion3);
                                                    
                                                    progamacion3.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 3");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 3 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
         
        setTimeout(function () {
            cinema.save(function (err,cinema) {
                if(err){
                    console.log("Error guardando el cinema");
                    return handleError(res,err);
                }
                console.log("cinema 2 guardado correctamente");
                
            });
             
        },30000);
    });
    
    /**
     * Fin creacion cinema premium plaza
     */
     
     
    
    /**
     * cinema Bosquez del plaza
     */
    var cinema3 = new cinemas({
       nombre: "Cinemas Bosque del Plaza",
       direccion: "Calle 20 # 50",
       municipio: "Medellín",
       cartelera: "568f1eab3de0d72b2d0ab4d6"
    });
    cinema3.save(function (err, cinema) {
        if(err)return handleError(res, err);
        console.log("Cinema 3 creado ....");
        /** 
         * programacion1 del cinema 2
         */
        var progamacion1 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala1 del cinema 3
         */
         
         
        var sala1 = new salas({
            numero: 1,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala1));
        sala1.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala1" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 1 creada creando la programacion...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion1.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe956'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion1.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion1._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion1.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe956';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion1.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion1._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion1.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94e';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion1.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion1._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion1.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion1);
                                                    
                                                    progamacion1.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 1 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        /**
         * fin creacion sala1 y programacion 1 del cinema 1
         */
         
         
         
        /**
         * programacion2 del cinema 2
         */
        var progamacion2 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala2 del cinema 2
         */
         
         
        var sala2 = new salas({
            numero: 2,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala2));
        sala2.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala2" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion2.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe94e'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion2.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion2._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion2.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe94a';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion2.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion2._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion2.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94a';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion2.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion2._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion2.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion2);
                                                    
                                                    progamacion2.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 2");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 2 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
        
        
        /**
         * fin creacion sala2 y programacion 2 del cinema 1
         */
         
         
         
        /**
         * programacion3 del cinema 1
         */
        var progamacion3 = new programaciones({
            fechaInicio:  new Date("2016 , 2,2"),
            fechaFin: new Date("2016, 3, 3"),
        });
        
        /**
         * sala3 del cinema 1
         */
         
         
        var sala3 = new salas({
            numero: 3,
            cinema: cinema._id
        });
        console.log("sala creada " +JSON.stringify( sala3));
        sala3.save(function (err,sala) {
            if (err)return handleError(res,err);
            console.log("sala3" + JSON.stringify(sala ));
            var silla1 = new sillas({
                fila:'a',
                numero:1,
                sala: sala._id
            });
            sala.sillas.push(silla1);
            silla1.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 1");
            });
            var silla2 = new sillas({
                fila:'a',
                numero:2,
                sala: sala._id
            });
            sala.sillas.push(silla2);
            silla2.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 2");
            });
            var silla3 = new sillas({
                fila:'a',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla3);
            silla3.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 3");
            });
            var silla4 = new sillas({
                fila:'b',
                numero:1,
                sala: sala._id
            });
             sala.sillas.push(silla4);
             silla4.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 4");
            });
            
            var silla5 = new sillas({
                fila:'b',
                numero:2,
                sala: sala._id
            });
            
             sala.sillas.push(silla5);
             silla5.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 5");
            });
            
            var silla6 = new sillas({
                fila:'b',
                numero:3,
                sala: sala._id
            });
            sala.sillas.push(silla6);
            silla6.save(function(err, silla) {
                if(err) return handleError(res, err);
                console.log("silla creada 6");
            });
            
            
            
            sala.save(function (err,sala) {
                if(err)return handleError(res,err);
                console.log("sala 2 creada creando la programacion 2...");
                
                /**
                 * sigo con la programacion del cinema
                 * guardo la sala correspondiente a la programacion
                 */
                
                progamacion3.sala = sala;
                
                /**
                 * la programacion tiene funciones, creo las funciones de esta programacion. por el momento 3 funciones por programacion
                 */
                 
                 /**
                  * primero encuentro la pelicula que ira en la funcion 
                  * para no tener que volver a crear las peliculas las busco con su id
                  */
                  
                /**
                 * funcion 1
                 */
                var id = '568f12f88c404c302c7fe94a'
                peliculas.findById(id, function (err, pelicula) {
                    if (err)return handleError(res,err);
                    console.log("encontro la pelicula sigue hacer la funcion");
                    var funcion1 = new funciones({
                        fecha : progamacion3.fechaInicio,
                        hora:"2:00 PM",
                        programacion: progamacion3._id,
                        pelicula: pelicula._id
                        
                    });
                    
                    var formato = pelicula.formato;
                    
                    /**
                     * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                     * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                     */
                     
                     /**
                      * boletas funcion 1
                      */
                    var boleta1 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla1,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    console.log("buscando preciosssssssssssssssssssssssssssssssssssssssssss " + formato + " " + silla1.localidad);
                    precios.findOne({formato:formato, localidad: silla1.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        console.log("precio encontrado " + precio);
                        boleta1.precio = precio;
                        boleta1.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 1 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla2.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta2.precio = precio;
                        boleta2.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 2 de funcion 1 creada..");
                        });
                        
                        
                    });
                    
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    
                    precios.findOne({formato:formato, localidad: silla3.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta3.precio = precio;
                        boleta3.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 3 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla4.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta4.precio = precio;
                        boleta4.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 4 de funcion 1 creada..");
                        });
                        
                    });
                   
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla5.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta5.precio = precio;
                        boleta5.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 5 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    precios.findOne({formato:formato, localidad: silla6.localidad}, function (err, precio) {
                        if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                        boleta6.precio = precio;
                        boleta6.save(function (err, boleta) {
                            if(err)return handleError(res,err);
                            console.log("Boleta 6 de funcion 1 creada..");
                        });
                        
                    });
                    
                    
                    
                    
                    setTimeout(function () {
                        funcion1.boletas.push(boleta1);
                        funcion1.boletas.push(boleta2);
                        funcion1.boletas.push(boleta3);
                        funcion1.boletas.push(boleta4);
                        funcion1.boletas.push(boleta5);
                        funcion1.boletas.push(boleta6);
                        
                        
                        funcion1.save(function(err,funcion){
                           if(err){
                               console.log("error en funcion 1");
                               return handleError(res,err);
                           }
                           console.log("funcion "+ JSON.stringify(funcion));
                           
                            
                           console.log("funcion 1 creada correctamente ... creando funcion2---- ");
                           progamacion3.funciones.push(funcion1);
                           
                           /**
                             * funcion 2
                             */
                            var id2 = '568f12f88c404c302c7fe956';
                            peliculas.findById(id2, function (err, pelicula) {
                                if (err)return handleError(res,err);
                                var funcion2 = new funciones({
                                    fecha : progamacion3.fechaInicio,
                                    hora:"4:30 PM",
                                    programacion: progamacion3._id,
                                    pelicula:pelicula._id,
                                });
                                
                                
                                /**
                                 * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                 * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                 */
                                 
                                 /**
                                  * boletas funcion 2
                                  */
                                var boleta1 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla1,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta1.precio = precio;
                                    boleta1.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 1 de funcion 1 creada..");
                                    });
                                    
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta2.precio = precio;
                                    boleta2.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 2 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta3.precio = precio;
                                    boleta3.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 3 de funcion 2 creada..");
                                    });
                                    
                                    
                                });
                                
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta4.precio = precio;
                                    boleta4.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 4 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                
                                precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta5.precio = precio;
                                    boleta5.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 5 de funcion 2 creada..");
                                    }); 
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                precios.findOne({formato:pelicula.formato, localidad: silla6.localidad}, function (err, precio) {
                                    if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                    boleta6.precio = precio;
                                    boleta6.save(function (err, boleta) {
                                        if(err)return handleError(res,err);
                                        console.log("Boleta 6 de funcion 2 creada..");
                                    });
                                });
                                
                                
                                setTimeout(function () {
                                    
                                    funcion2.boletas.push(boleta1);
                                    funcion2.boletas.push(boleta2);
                                    funcion2.boletas.push(boleta3);
                                    funcion2.boletas.push(boleta4);
                                    funcion2.boletas.push(boleta5);
                                    funcion2.boletas.push(boleta6);
                                    
                                    funcion2.save(function (err,funcion) {
                                        if(err){
                                            console.log("error creado la funcion 2");
                                            return handleError(res,err);
                                        }
                                        console.log("funcion 2 creada correctamente... creando la funcion 3....");
                                        
                                        progamacion3.funciones.push(funcion);
                                        
                                         /**
                                         *                                  funcion 3
                                         */
                                        var id3 = '568f12f88c404c302c7fe94e';
                                        peliculas.findById(id3, function (err, pelicula) {
                                            if (err)return handleError(res,err);
                                            var funcion3 = new funciones({
                                                fecha : progamacion3.fechaInicio,
                                                hora:"7:00 PM",
                                                programacion: progamacion3._id,
                                                pelicula:pelicula._id,
                                            });
                                            
                                            
                                            /**
                                             * cada funcion tiene sus boletas deacuerdo a la cantidad de sillas de la sala en la programacion
                                             * como todas las salas tienen por el momento 6 sillas tengo que crear 6 boletas por cada funcion Todavia no tienen precio
                                             */
                                             
                                             /**
                                              * boletas funcion 3
                                              */
                                            var boleta1 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla1,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta1.precio = precio;
                                                boleta1.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 1 de funcion 3 creada..");
                                                });
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla2.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta2.precio = precio;
                                                boleta2.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 2 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla3.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta3.precio = precio;
                                                boleta3.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 3 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla4.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta4.precio = precio;
                                                boleta4.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 4 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla5.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta5.precio = precio;
                                                boleta5.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 5 de funcion 3 creada..");
                                                });
                                                
                                            });
                                            
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            precios.findOne({formato:pelicula.formato, localidad: silla1.localidad}, function (err, precio) {
                                                if (err){ console.log("Error buscando el precio");return handleError(res, err);}
                                                boleta6.precio = precio;
                                                boleta6.save(function (err, boleta) {
                                                    if(err)return handleError(res,err);
                                                    console.log("Boleta 6 de funcion 3 creada..");
                                                });
                                            
                                                
                                            });
                                            
                                            setTimeout(function () {
                                                funcion3.boletas.push(boleta1);
                                                funcion3.boletas.push(boleta2);
                                                funcion3.boletas.push(boleta3);
                                                funcion3.boletas.push(boleta4);
                                                funcion3.boletas.push(boleta5);
                                                funcion3.boletas.push(boleta6);
                                                
                                                
                                                progamacion3.funciones.push(funcion3);
                                                
                                                funcion3.save(function (err, funcion) {
                                                    if (err){
                                                        console.log("Error guardando la funcion 3");
                                                        return handleError(res, err);
                                                    }
                                                    console.log("funcion 3 creada....  guardando programacion");
                                                    
                                                    cinema.programacionActual.push(progamacion3);
                                                    
                                                    progamacion3.save(function(err, programacion){
                                                        if(err){
                                                            console.log("Error guardando programacion 3");
                                                            return handleError(err,res);
                                                        }
                                                        console.log("programacion 3 guardada correctamente .. guardando cinema");
                                                        
                                                        
                                                    });
                                                });
                                            },3000) 
                                        });
                                    });    
                                },3000)
                            });
                        });   
                    },3000);
                });
            });
        });
         
        setTimeout(function () {
            cinema.save(function (err,cinema) {
                if(err){
                    console.log("Error guardando el cinema 3");
                    return handleError(res,err);
                }
                console.log("cinema 3 guardado correctamente");
                
            });
             
        },30000);
    });
    
    /**
     * fin cinema 3
     */
     
    
    setTimeout(function() {
        console.log("todo Correcto");
        return res.status(200).json({todo:'correcto'});
    }, 38000);
    

};


exports.borrar = function (req, res) {
    salas.remove({}, function (err) {
        if (err)return handleError(res, err);
        console.log("borrada salas");
    });
    boletas.remove({}, function (err) {
        if (err)return handleError(res, err);
        console.log("borrada boletas");
    });
    funciones.remove({}, function (err) {
        if (err)return handleError(res, err);
        console.log("borrada funciones");
    });
    programaciones.remove({}, function (err) {
        if (err)return handleError(res, err);
        console.log("borrada programaciones");
    });
    sillas.remove({}, function (err) {
        if (err)return handleError(res, err);
        console.log("borrada sillas");
    });
    cinemas.remove({nombre:"Cinemas Monterrey"}, function(err) {
        if(err) return handleError(res,err);
        console.log("Cinemas Monterrey Borrado")
    })
    return res.status(200).json({borrado:'correcto'});
};

//listar todas las boletas
exports.boletas = function (req, res) {
    boletas.find().populate('precio').exec(function (err, boletas) {
        if(err)return handleError(res,err);
        res.status(200).json(boletas);
    });
};

//get cinema con programacion

exports.progcine = function (req, res) {
    cinemas.find().populate('programacionActual').exec(function (err, cinema) {
        if(err)return handleError(res, err);
        return res.status(200).json(cinema);
    });
};

function handleError(res, err) {
    return res.status(500).json(err);
};


