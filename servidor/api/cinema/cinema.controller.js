
var cinemas = require('./cinema.modelo');

var programaciones = require('../programacion/programacion.modelo');
var salas = require('../sala/sala.modelo');
var sillas = require('../silla/silla.modelo');
var funciones = require('../funcion/funcion.modelo');
var peliculas = require('../pelicula/pelicula.modelo');
var boletas = require('../boleta/boleta.modelo');



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
 
exports.create = function (req,res) {
    
    /**
     * Cinema Monterrey
     */
    var cinema = new cinemas({
       nombre: "Cinemas Monterrey",
       direccion: "Calle 10",
       municipio: "Medellín",
       cartelera: "568f1eab3de0d72b2d0ab4d6"
    });
    cinema.save(function (err, cinema) {
        if(err)return handleError(res, err);
        console.log("Cinema creado ....");
        /**
         * programacion del cinema
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
                        programacion: progamacion1._id,
                        pelicula: pelicula._id
                        
                    });
                    
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
                    boleta1.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 1 de funcion 1 creada..");
                    });
                    
                    var boleta2 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla2,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    boleta2.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 2 de funcion 1 creada..");
                    });
                    
                    var boleta3 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla3,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    boleta3.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 2 de funcion 1 creada..");
                    });
                    
                    var boleta4 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla4,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    boleta4.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 2 de funcion 1 creada..");
                    });
                    
                    var boleta5 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla5,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    boleta5.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 2 de funcion 1 creada..");
                    });
                    
                    var boleta6 = new boletas({
                        reserva:true,
                        qr:"Todavia no",
                        sillaReservada: false,
                        silla: silla6,
                        funcion: funcion1,
                        fecha:funcion1.fecha
                    });
                    boleta6.save(function (err, boleta) {
                        if(err)return handleError(res,err);
                        console.log("Boleta 2 de funcion 1 creada..");
                    });
                    
                    funcion1.boletas.push(boleta1);
                    funcion1.boletas.push(boleta2);
                    funcion1.boletas.push(boleta3);
                    funcion1.boletas.push(boleta4);
                    funcion1.boletas.push(boleta5);
                    funcion1.boletas.push(boleta6);
                    
                    setTimeout(function () {
                        
                        
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
                                boleta1.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 1 de funcion 2 creada..");
                                });
                                
                                var boleta2 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla2,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                boleta2.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 2 de funcion 2 creada..");
                                });
                                
                                var boleta3 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla3,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                boleta3.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 3 de funcion 2 creada..");
                                });
                                
                                var boleta4 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla4,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                boleta4.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 4 de funcion 2 creada..");
                                });
                                
                                var boleta5 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla5,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                boleta5.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 5 de funcion 2 creada..");
                                });
                                
                                var boleta6 = new boletas({
                                    reserva:true,
                                    qr:"Todavia no",
                                    sillaReservada: false,
                                    silla: silla6,
                                    funcion: funcion2,
                                    fecha:funcion1.fecha
                                });
                                boleta6.save(function (err, boleta) {
                                    if(err)return handleError(res,err);
                                    console.log("Boleta 6 de funcion 2 creada..");
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
                                            boleta1.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 1 de funcion 3 creada..");
                                            });
                                            
                                            var boleta2 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla2,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            boleta2.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 2 de funcion 3 creada..");
                                            });
                                            
                                            var boleta3 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla3,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            boleta3.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 3 de funcion 3 creada..");
                                            });
                                            
                                            var boleta4 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla4,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            boleta4.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 4 de funcion 3 creada..");
                                            });
                                            
                                            var boleta5 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla5,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            boleta5.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 5 de funcion 3 creada..");
                                            });
                                            
                                            var boleta6 = new boletas({
                                                reserva:true,
                                                qr:"Todavia no",
                                                sillaReservada: false,
                                                silla: silla6,
                                                funcion: funcion3,
                                                fecha:funcion1.fecha
                                            });
                                            boleta6.save(function (err, boleta) {
                                                if(err)return handleError(res,err);
                                                console.log("Boleta 6 de funcion 3 creada..");
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
                                                        
                                                        cinema.save(function (err,cinema) {
                                                            if(err){
                                                                console.log("Error guardando el cinema");
                                                                return handleError(res,err);
                                                            }
                                                            console.log("cinema guardado correctamente");
                                                            return res.status(200).json(cinema);
                                                        });
                                                    });
                                                });
                                            },2000) 
                                        });
                                    });    
                                },2000)
                            });
                        });   
                    },2000);
                });
            });
        });
    })
}


function handleError(res, err) {
    return res.status(500).json(err);
};


