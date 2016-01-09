'use strict';

var peliculas = require('./pelicula.modelo');


/**
 * Obtener todas las peliculas
 */
 
exports.peliculas = function (req, res) {
    peliculas.find({},'_id nombre imagen', function (err, peliculas) {
        if (err) return handleError(res, err);
        return res.status(200).json(peliculas);
    });
};

/**
 * Obtener una pelicula por su id
 */

exports.pelicula= function (req,res) {
    peliculas.findOne({_id :req.params.id}, function (err, pelicula) {
        if (err) return handleError(res, err);
        return res.status(200).json(pelicula);
    });
}



/**
 * Añade un comentario a una pelicula
 */
exports.comentar=function (req,res) {
    console.log(JSON.stringify(req.body));
    peliculas.findOne({_id:req.body.id}, function(err, pelicula) {
        if(err)return handleError(res, err);
        pelicula.comentarios.push(req.body.comentario);
        pelicula.save(function (err, pelicula) {
            if(err)return handleError(res,err);
            console.log("guardada exitosamente");
            return res.status(200).json({s:'s'});
        })
        
    })
    
};


/**
 * creacion de peliculas
 */
exports.create = function (req,res) {
    
    var principito = new peliculas({
        nombre:"Pricipito",
        formato:"3D",
        lenguaje:"Ingles",
        descripcion:"Redescubre una de las historias más amadas de todos los tiempos. Del director nominado al Oscar® por Kung Fu Panda Mark Osborne, llega por primera vez al cine la adaptación cinematográfica animada de la obra maestra emblemática de Antoine de Saint-Exupéry, El Principito. En el corazón de todo está La Niña, que está siendo preparada por su madre para un muy adulto mundo en el que viven, sólo para ser interrumpidas por su excéntrico y bondadoso vecino, El Aviador. El aviador muestra a su nueva amiga un mundo extraordinario donde todo es posible. Un mundo en el que él mismo fue iniciado hace mucho tiempo por El Principito. Es aquí donde el viaje mágico y emocional de La Niña por el universo de El Principito comienza. Y es donde La Niña redescubre su infancia y aprende que en última instancia, son las conexiones humanas lo que importa, que sólo con el corazón es que uno puede ver bien; lo esencial es invisible a los ojos.",
        genero:"Aventura",
        trailer: "https://youtu.be/nxIA9xOTjzY",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/Principito.jpg",
        pais:"Estados Unidos",
        director:"Mark Osborne",
        reparto:[{
            nombre:"Rachel mcAdams",
        },
        {
            nombre:"James Franco"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        }]
    });
    
    principito.save(function (err) {
        if (err) return handleError(res , err);
        console.log("principito guardada");
    });
    
    var marte = new peliculas({
        nombre:"marte",
        formato:"3D",
        lenguaje:"Ingles",
        descripcion:"Durante una misión a Marte de la nave tripulada Ares III, una fuerte tormenta se desata dando por desaparecido y muerto al astronauta Mark Watney (Matt Damon), sus compañeros toman la decisión de irse pero él ha sobrevivido. Está solo y sin apenas recursos en el planeta. Con muy pocos medios deberá recurrir a sus conocimientos, su sentido del humor y un gran instinto de supervivencia para lograr sobrevivir y comunicar a la Tierra que todavía está vivo esperando que acudan en su rescate.",
        genero:"Acción",
        trailer: "https://youtu.be/znSI5LmeCtU",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/marte.jpg",
        pais:"Estados Unidos",
        director:"Ridley Scott",
        reparto:[{
            nombre:"Matt Damon ",
        },
        {
            nombre:"Jessica Chastain"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        }]
    });
    
    marte.save(function (err) {
        if (err) return handleError(res , err);
        console.log("marte guardada")
    });
    
    
    var rec = new peliculas({
        nombre:"REC",
        formato:"3D",
        lenguaje:"Español",
        descripcion:"Cada noche, Ángela, una joven reportera de una TV local, sigue con su cámara a un colectivo distinto. Esta noche les toca a los bomberos, con la secreta esperanza de poder vivir en directo un impactante incendio. Pero la noche trascurre extremadamente tranquila. Y cuando por fin reciben la llamada de una anciana que se ha quedado encerrada en su casa, no les queda otro remedio que seguir a un grupo de bomberos durante su misión de rescate. En el edificio donde vive la anciana, los vecinos están muy asustados. Demasiado. La mujer, encerrada en su piso, lanza unos gritos desgarradores...",
        genero:"Terror",
        trailer: "https://youtu.be/4vOO6FnND9w",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/rec.jpg",
        pais:"España",
        director:"Jaume Balagueró, Paco Plaza",
        reparto:[{
            nombre:"Manuela Velasco"
        },
        {
            nombre:"Jessica Chastain"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        }]
    });
    
    rec.save(function (err) {
        if (err) return handleError(res , err);
        console.log("rec guardada")
    });
    
    var sinsajo = new peliculas({
        nombre:"Sinsajo",
        formato:"3D",
        lenguaje:"Ingles",
        descripcion:"En este último desafío lleno de trampas, enemigos, y decisiones mortales, Katniss se dará cuenta de que no sólo está en juego su propia supervivencia, sino también el futuro de todos. ¿Quién sobrevivirá y quién morirá? ¿Qué decidirán los vencedores? ¿Continuarán los Juegos? Y en el terreno amoroso, ¿acabará eligiendo Katniss al atractivo Gale o al tierno aunque emocionalmente dañado Peeta?",
        genero:"Accion",
        trailer: "https://youtu.be/3-ar77u-Mww",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/sinsajo.jpg",
        pais:"España",
        director:"Francis Lawrence",
        reparto:[{
            nombre:"Jennifer Lawrence"
        },
        {
            nombre:"Josh Hutcherson"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        }]
    });
    
    sinsajo.save(function (err) {
        if (err) return handleError(res , err);
        console.log("sinsajo guardada")
    });
    
    var corazonmar = new peliculas({
        nombre:"En el corazón del mar",
        formato:"9.5mm",
        lenguaje:"Español (Doblada)",
        descripcion:"En 1820, el Ballenero Essex está tripulado por el capitán George Pollard Jr. (Benjamin Walker), primer oficial Owen Chase, Chris Hemsworth), segundo oficial Matthew Joy (Cillian Murphy), y el grumete Thomas Nickerson (Tom Holland). Durante su viaje, el barco se hundió cuando se estrelló con una ballena de tamaño y voluntad descomunal, con un sentido de la venganza casi humano. Horribles consecuencias del encuentro ocurrieron, cuando los supervivientes de la tripulación fueron forzados a extremos en los que se vieron obligados a recurrir al canibalismo, mientras el viento los lleva a las costas de América del Sur, específicamente a las costas de la ciudad chilena de Valparaíso.",
        genero:"Drama",
        trailer: "https://youtu.be/iS13XWZUbg8",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/sinsajo.jpg",
        pais:"España",
        director:"Ron Howard",
        reparto:[{
            nombre:"Chris Hemsworth"
        },
        {
            nombre:"Benjamin Walker"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        },{
            texto:"Exelente",
            autor:"Pedro"
        }]
    });
    
    corazonmar.save(function (err) {
        if (err) return handleError(res , err);
        console.log("corazon  guardada")
    });
    
    var frank = new peliculas({
        nombre:"Victor Frankenstein",
        formato:"3D",
        lenguaje:"Español (Doblada)",
        descripcion:"En la cinta James McAvoy será Viktor Von Frankenstein y Daniel Radcliffe será Igor, en un gran giro nunca antes visto de la clásica novela del siglo XIX de Mary Shelley. Contada desde la perspectiva de Igor, veremos los oscuros orígenes de estos dos personajes con problemas, cómo se forjó amistad, su redención, y cómo se convirtieron en testigos de la aparición de Frankenstein, la leyenda que todos conocemos.",
        genero:"Drama",
        trailer: "https://youtu.be/7pxZxY_Siyc",
        imagen:"https://cine-u-de-a-cposada23.c9users.io/public/recursos/imagenes/VF.jpg",
        pais:"España",
        director:" Paul McGuigan",
        reparto:[{
            nombre:" Daniel Radcliffe"
        },
        {
            nombre:"Benjamin Walker"
        }],
        censura:"R",
        comentarios:[{
            texto:"Buena",
            autor:"Camilo"
        },{
            texto:"Exelente",
            autor:"Pedro"
        }]
    });
    
    frank.save(function (err) {
        if (err) return handleError(res , err);
        console.log("corazon  guardada")
    });
    
    return res.status(200);
}

function handleError(res, err) {
    return res.send(500, err);
};
