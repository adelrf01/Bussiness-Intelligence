var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var cors = require("cors");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "FichajesFutbol"));
const session = driver.session();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.post("/dameJugador", function(req, res) {
    var jugador = req.body.nombre;
    var query="Match(j:Jugador) where j.nombre='"+jugador+"' return j";
    const resultadoPromesa = session.run(query).subscribe({
        onNext:function(record){
            console.log(record+"        ,\n")
        },
        onCompleted:function(){
            console.log("Completado");
        },
        onError:function(error){
            console.log(error+" erroooooooooor");
        }
    })
});

app.listen(3000, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
  });