var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var cors = require("cors");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "FichajesFutbol"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.get("/dameJugador", function (req, res) {
    const session = driver.session();
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
            session.close();
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })

});

app.get("/dameLosMasPrometedores", (req, res) => {
    const session = driver.session();
    var query = "match(j:Jugador) where j.edad>='16' and j.edad<='23' return j order by j.potencial desc limit 10";
    var lista=[];
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
            session.close();
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameLosMejores", (req, res) => {
    const session = driver.session();
    var lista = [];
    var query = "match(j:Jugador) return j order by j.puntuacion desc limit 10";
    //res.send(query);
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
            session.close();
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameJugadoresAleatorios",(req,res)=>{
    const session = driver.session();
    var lista=[];
    var min=60;
    var max=95;
    var potencial=Math.floor((Math.random()* ((max+1)-min)+min));
    var query="match(j:Jugador) where j.potencial='"+potencial+"' return j order by j.puntuacion desc limit 10";
    console.log(/*query*/"Estoy en funcion dame jugadores aleatorios");
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            lista.push(result.get(0).properties);
        },
        onCompleted: function () {
            res.send(lista);
            session.close();
            //res.send(query);
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameNacionalidades",(req,res)=>{
    const session = driver.session();
    console.log("Estoy en dame nacionalidades");
    var nacionalidades=[];
    var query="match(j:Jugador) return distinct j.nacionalidad"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            nacionalidades.push(result.get(0));
        },
        onCompleted: function () {
            //console.log(nacionalidades.length);
            res.send(nacionalidades);
            session.close();
            /*//res.send(query);*/
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameEquipos",(req,res)=>{
    const session = driver.session();
    console.log("Estoy en dame Equipos");
    var equipos=[];
    var query="match(j:Jugador) return distinct j.equipo";
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
           equipos.push(result.get(0));
        },
        onCompleted: function () {
            //console.log(nacionalidades.length);
            res.send(equipos);
            session.close();
            /*//res.send(query);*/
        },
        onError: function (error) {
            console.log(error + " erroooooooooor");
        }
    })
});

app.get("/dameJugadoresConFiltros",(req,res)=>{
    console.log("ESTAMOS EN DAME Jugadores con filtros");
    var nacionalidad=req.query.nacionalidad;
    var posicion=req.query.posicion;
    var equipo=req.query.equipo;
    var puntuacion=req.query.puntuacion;
    var potencial=req.query.potencial;
    var salario=req.query.salario;
    var precio=req.query.precio;
    var edad=req.query.edad;
    
    //console.log("LA NACIONALIDAD ES:"+nacionalidad);
    console.log("LA EDAD MAXIMA ES:"+edad);
    //res.send("Servidor contesta");
});


app.listen(3000, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
});