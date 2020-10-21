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


app.get("/dameJugador", function (req, res) {
    var puntuacion = req.query.puntuacion;
    var query = "Match(j:Jugador) where j.puntuacion='" + puntuacion + "' ";
    var nacionalidad = req.query.pais;
    if (nacionalidad == "cualquiera") {
        query += "return j";
    } else {
        query += "and j.nacionalidad='" + nacionalidad + "' ";
    }
    query += "return j";
    var lista = []
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })

});

app.get("/dameLosMasPrometedores", (req, res) => {
    var query = "match(j:Jugador) where j.edad>='16' and j.edad<='23' return j order by j.potencial desc limit 10";
    var lista=[];
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameLosMejores", (req, res) => {
    var lista = [];
    var query = "match(j:Jugador) return j order by j.puntuacion desc limit 10";
    //res.send(query);
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameJugadoresAleatorios",(req,res)=>{
    var lista=[];
    var min=60;
    var max=95;
    var potencial=Math.floor((Math.random()* ((max+1)-min)+min));
    var query="match(j:Jugador) where j.potencial='"+potencial+"' return j order by j.potencial desc limit 10";
    console.log(query);
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});


app.listen(3000, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
});