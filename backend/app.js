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

app.get("/hola", function (req, res) {
    res.send("Hola gente");
});


app.post("/dameJugador", function (req, res) {
    var puntuacion = req.body.puntuacion;
    var query = "Match(j:Jugador) where j.puntuacion='" + puntuacion + "' ";
    var nacionalidad = req.body.pais;
    if (nacionalidad == "cualquiera") {
        query += "return j";
    } else {
        query += "and j.nacionalidad='" + nacionalidad + "' ";
    }
    query += "return j";
    //res.send(query);
    var lista = []
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.records);
            //console.log(result.get(0));
            lista.push(result.get(0).properties);
            //console.log(result);
            //res.send(record.get(0).properties);
        },
        onCompleted: function () {
            console.log(lista[0]);
            console.log("_____________________________");
            console.log(lista[1]);
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

app.listen(3000, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
});