<template>
  <v-app style="background: #1A237E">
    <v-app-bar app color="#1A237E" dark>
      <v-row align="center" justify="center">
        <v-btn text @click="jugadoresAleatorios">Jugadores aleatorios</v-btn>
        <v-btn text @click="filtros">Elegir jugador por mediante filtros</v-btn>
        <v-btn text @click="jugadoresPromesas">Mejores promesas</v-btn>
        <v-btn text @click="mejoresJugadores">Mejores jugadores</v-btn>
      </v-row>
    </v-app-bar>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in fotos"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-content v-show="mostrarJugadoresAleatorios">
      <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresAleatorios" :key="jugador.id">
          <v-card color="#F57C00" :elevation="20" max-height="520">
            <v-card-title
              >Nombre completo:{{ jugador.nombreCompleto }}</v-card-title
            >
            <v-card-text>
              ID:{{ jugador.id }}
              <br />
              Nombre Completo:{{ jugador.nombreCompleto }}
              <br />
              Nacionalidad:{{ jugador.nacionalidad }}
              <br />
              Precio:{{ jugador.precio }}
              <br />
              Salario:{{ jugador.salario }}
              <br />
              Puntuacion:{{ jugador.puntuacion }}
              <br />
              Potencial:{{ jugador.potencial }}
              <br />
              Edad:{{ jugador.edad }}
              <br />
              Equipo Actual:{{ jugador.equipo }}
              <br />
              Posicion:{{ jugador.posicion }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-content v-show="mostrarPorFiltros">
      <v-card color="#1A237E">
        <v-toolbar color="#1A237E">
          nacionalidades:
          <v-select
            :items="nacionalidades"
            label="Cualquiera"
            v-model="pais"
            dense
            outline
          />
          Posicion:
          <v-select
            :items="listaPosicionesEspañol"
            label="Cualquiera"
            v-model="posicion"
            dense
            outline
          />
          Equipo:
          <v-select
            :items="listaEquipos"
            label="Cualquiera"
            v-model="equipo"
            dense
            outline
          />
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-slider
            v-if="deseaMostrarPuntuacion"
            v-model="valorPuntuacion"
            step="1"
            thumb-label
            ticks
            label="Maxima puntuacion"
            min="60"
          ></v-slider>
          <v-select
            :items="mostrarPuntuacion"
            v-model="puntuacion"
            label="Elegir maxima puntuacion"
          ></v-select>
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-slider
            v-if="deseaMostrarPotencial"
            v-model="valorPotencial"
            step="1"
            thumb-label
            ticks
            label="Maximo potencial"
            min="60"
          ></v-slider>
          <v-select
            :items="mostrarPotencial"
            v-model="potencial"
            label="Elegir maximo potencial"
          ></v-select>
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-slider
            v-if="deseaMostrarPrecio"
            v-model="valorPrecio"
            step="10000"
            thumb-label
            ticks
            label="Maximo precio"
            max="15000000"
          ></v-slider>
          <v-select
            :items="mostrarPrecio"
            v-model="precio"
            label="Elegir precio maximo"
          ></v-select>
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-slider
            v-if="deseaMostrarEdad"
            v-model="valorEdad"
            step="1"
            thumb-label
            ticks
            label="Maxima edad"
            max="45"
            min="16"
          ></v-slider>
          <v-select
            :items="mostrarEdad"
            v-model="edad"
            label="Elegir edad maxima"
          ></v-select>
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-slider
            v-if="deseaMostrarSalario"
            v-model="valorSalario"
            step="7000"
            thumb-label
            ticks
            label="Maximo Salario"
            max="600000"
          ></v-slider>
          <v-select
            :items="mostrarSalario"
            v-model="salario"
            label="Elegir salario maximo"
          ></v-select>
        </v-toolbar>
        <v-toolbar color="#1A237E">
          <v-spacer></v-spacer>
          <v-btn text @click="buscarJugadores">Buscar jugadores</v-btn>
        </v-toolbar>
      </v-card>
      <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresPorFiltros" :key="jugador.id">
          <v-card color="#F57C00" :elevation="20" max-height="520">
            <v-card-title
              >Nombre completo:{{ jugador.nombreCompleto }}</v-card-title
            >
            <v-card-text>
              ID:{{ jugador.id }}
              <br />
              Nombre Completo:{{ jugador.nombreCompleto }}
              <br />
              Nacionalidad:{{ jugador.nacionalidad }}
              <br />
              Precio:{{ jugador.precio }}
              <br />
              Salario:{{ jugador.salario }}
              <br />
              Puntuacion:{{ jugador.puntuacion }}
              <br />
              Potencial:{{ jugador.potencial }}
              <br />
              Edad:{{ jugador.edad }}
              <br />
              Equipo Actual:{{ jugador.equipo }}
              <br />
              Posicion:{{ jugador.posicion }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-content v-show="mostrarMejoresPromesas">
      <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresPromesas" :key="jugador.id">
          <v-card color="#F57C00" :elevation="20" max-height="520">
            <v-card-title
              >Nombre completo:{{ jugador.nombreCompleto }}</v-card-title
            >
            <v-card-text>
              ID:{{ jugador.id }}
              <br />
              Nombre Completo:{{ jugador.nombreCompleto }}
              <br />
              Nacionalidad:{{ jugador.nacionalidad }}
              <br />
              Precio:{{ jugador.precio }}
              <br />
              Salario:{{ jugador.salario }}
              <br />
              Puntuacion:{{ jugador.puntuacion }}
              <br />
              Potencial:{{ jugador.potencial }}
              <br />
              Edad:{{ jugador.edad }}
              <br />
              Equipo Actual:{{ jugador.equipo }}
              <br />
              Posicion:{{ jugador.posicion }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-content v-show="mostrarMejoresJugadores">
      <v-layout row wrap>
        <v-flex v-for="jugador in listaMejoresJugadores" :key="jugador.id">
          <v-card color="#F57C00" :elevation="20" max-height="520">
            <v-card-title
              >Nombre completo:{{ jugador.nombreCompleto }}</v-card-title
            >
            <v-card-text>
              ID:{{ jugador.id }}
              <br />
              Nombre Completo:{{ jugador.nombreCompleto }}
              <br />
              Nacionalidad:{{ jugador.nacionalidad }}
              <br />
              Precio:{{ jugador.precio }}
              <br />
              Salario:{{ jugador.salario }}
              <br />
              Puntuacion:{{ jugador.puntuacion }}
              <br />
              Potencial:{{ jugador.potencial }}
              <br />
              Edad:{{ jugador.edad }}
              <br />
              Equipo Actual:{{ jugador.equipo }}
              <br />
              Posicion:{{ jugador.posicion }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
const axios = require("axios");
const direccionIp = "http://127.0.0.1:3000";
export default {
  name: "App",
  data(){
    return{
      mostrarJugadoresAleatorios:false,
      mostrarPorFiltros:false,
      mostrarMejoresPromesas:false,
      mostrarMejoresJugadores:false,
      listaJugadoresAleatorios:[],
      listaMejoresJugadores:[],
      listaPosicionesInglesAb:["RW","ST","LW","CAM","GK","CB","CDM","CF","CM","LM","RB","LB","RM","LWB","RWB"],
      listaPosicionesEspañolAb:["ED","DC","EI","MCO","POR","DFC","MCD","MP","MC","MI","LTD","LTI","MD","CAI","CAD"],
      listaPosicionesEspañol:["Extremo derecho","Delantero centro","Extremo izquierdo","Mediocentro ofensivo","Portero","Defensa central","Mediocentro defensivo","Mediapunta","Mediocentro","Medio izquierdo","Lateral derecho","Lateral izquierda","Medio derecho","Carrilero izquierdo","Carrilero derecho"],
      fotos:[
        {src:"https://live.staticflickr.com/3333/3580954073_0deb9ec98e_b.jpg"},
        {src:"https://estaticos.muyhistoria.es/uploads/images/pyr/5e6b70975bafe8622bcdb30f/REDES.jpg"},
        {src:"https://media.istockphoto.com/vectors/set-of-tournament-posters-of-football-or-soccer-league-design-of-for-vector-id950398608?b=1&k=6&m=950398608&s=612x612&w=0&h=6ePl4cGEUkNt72-xN6qD6DjYEkDHiB837iK9WLTCW2A="},
        {src:"https://p1.pxfuel.com/preview/849/991/808/stadium-crowded-football-people-event-spectators.jpg"}
      ],
      listaJugadoresPorFiltros:[],
      listaJugadoresPromesas:[],
      nacionalidades:[],
      pais:"",
      posicion:"",
      listaEquipos:[],
      equipo:"",
      mostrarPuntuacion:["si","no"],
      mostrarPotencial:["si","no"],
      mostrarPrecio:["si","no"],
      mostrarEdad:["si","no"],
      mostrarSalario:["si","no"],
      deseaMostrarSalario:false,
      deseaMostrarPuntuacion:false,
      deseaMostrarPotencial:false,
      deseaMostrarPrecio:false,
      deseaMostrarEdad:false,
      valorPuntuacion:"",
      valorPotencial:"",
      puntuacion:"",
      potencial:"",
      valorPrecio:"",
      precio:"",
      valorEdad:"",
      edad:"",
      valorSalario:"",
      salario:""
    }
  },
  mounted(){
    axios
    .get(direccionIp+"/dameJugadoresAleatorios")
    .then(response=>{
      this.aleatorios(response.data);
    })
  },
  methods:{
    filtros(){
      this.potencialYpuntuacion();
      this.mostrarPorFiltros=!this.mostrarPorFiltros;
      this.rellenarNacionalidades();
      this.listaPosicionesEspañol.push("Cualquiera");
      this.rellenarEquipos();
      this.listaJugadoresPorFiltros=[];
    },
    potencialYpuntuacion(){
      this.deseaMostrarPotencial=false;
      this.deseaMostrarPuntuacion=false;
      this.deseaMostrarEdad=false;
      this.deseaMostrarPrecio=false;
    },
    rellenarNacionalidades(){
      axios
        .get(direccionIp+"/dameNacionalidades")
        .then(respuesta=>{
          for(var i=0;i<respuesta.data.length;i++){
            this.nacionalidades.push(respuesta.data[i]);
          }
          //this.nacionalidades=respuesta.data;
        });
      this.nacionalidades.push("Cualquiera");
    },
    rellenarEquipos(){
      axios
        .get(direccionIp+"/dameEquipos")
        .then(respuesta=>{
          for(var i=0;i<respuesta.data.length;i++){
            this.listaEquipos.push(respuesta.data[i]);
          }
        });
      this.listaEquipos.push("Cualquiera");
    },
    aleatorios(response){
      //pNueva = this.nuevoPrecio(response[0].precio);
      for(var i=0;i<response.length;i++){
        response[i].precio=this.nuevoPrecio(response[i].precio);
        response[i].salario=this.nuevoPrecio(response[i].salario);
        response[i].posicion=response[i].posicion+"/"+this.posicionEnEspañol(response[i].posicion);
        this.listaJugadoresAleatorios.push(response[i]);
      }
    },
    porFiltros(response){
      for(var i=0;i<response.length;i++){
        response[i].precio=this.nuevoPrecio(response[i].precio);
        response[i].salario=this.nuevoPrecio(response[i].salario);
        response[i].posicion=response[i].posicion+"/"+this.posicionEnEspañol(response[i].posicion);
        this.listaJugadoresPorFiltros.push(response[i]);
      }
    },
    promesas(response){
      for(var i=0;i<response.length;i++){
        response[i].precio=this.nuevoPrecio(response[i].precio);
        response[i].salario=this.nuevoPrecio(response[i].salario);
        response[i].posicion=response[i].posicion+"/"+this.posicionEnEspañol(response[i].posicion);
        //console.log(response[i]);
        this.listaJugadoresPromesas.push(response[i]);
      }
    },
    jugadoresAleatorios(){
      this.listaJugadoresAleatorios=[];
      axios
        .get(direccionIp+"/dameJugadoresAleatorios")
        .then(response=>{
          this.aleatorios(response.data);
      });
      this.mostrarJugadoresAleatorios=!this.mostrarJugadoresAleatorios;
    },
    jugadoresPromesas(){
      this.listaJugadoresPromesas=[];
      axios
        .get(direccionIp+"/dameJugadoresPromesas")
        .then(respuesta=>{
          this.promesas(respuesta.data);
        });
        this.mostrarMejoresPromesas=!this.mostrarMejoresPromesas;
    },
    mejores(response){
      for(var i=0;i<response.length;i++){
        response[i].precio=this.nuevoPrecio(response[i].precio);
        response[i].salario=this.nuevoPrecio(response[i].salario);
        response[i].posicion=response[i].posicion+"/"+this.posicionEnEspañol(response[i].posicion);
        //console.log(response[i]);
        this.listaMejoresJugadores.push(response[i]);
      }
    },
    mejoresJugadores(){
      this.listaMejoresJugadores=[];
      axios
        .get(direccionIp+"/dameLosMejores")
        .then(respuesta=>{
          this.mejores(respuesta.data);
        });
        this.mostrarMejoresJugadores=!this.mostrarMejoresJugadores;
    },
    nuevoPrecio(precio){
      var pos=precio.length;
      var precioNuevo="";
      var cont=0;
      if(pos>3){
        for(var i=pos-1;i>=0;i--){
          cont++;
          precioNuevo=precio[i]+precioNuevo;
          if(cont%3==0){
            precioNuevo="."+precioNuevo;
          }
        }
      }else{
        precioNuevo=precio;
      }
      return precioNuevo;
    },
    posicionEnEspañol(posicion){
      var i =this.listaPosicionesInglesAb.indexOf(posicion);
      return this.listaPosicionesEspañol[i];
    },
    buscarJugadores(){
      this.listaJugadoresPorFiltros=[];
      var nacionalidad,posicion,equipo;
      var puntuacionMaxima,potencialMaximo, salarioMaximo, precioMaximo, edadMaxima;
      if(this.pais.length==0 || this.pais=="Cualquiera"){
        nacionalidad="cualquiera";
      }else{
        nacionalidad=this.pais;
      }
      if(this.posicion.length==0 || this.posicion=="Cualquiera"){
        posicion="cualquiera";
      }else{
        var pos = this.listaPosicionesEspañol.indexOf(this.posicion);
        posicion=this.listaPosicionesInglesAb[pos];
      }
      if(this.equipo.length==0 || this.equipo=="Cualquiera"){
        equipo="cualquiera";
      }else{
        equipo=this.equipo;
      }
      if(this.puntuacion=="no" || this.puntuacion.length==0 ){
        puntuacionMaxima="cualquiera";
      }else{
        puntuacionMaxima=this.valorPuntuacion;
      }
      if(this.potencial=="no" || this.potencial.length==0){
        potencialMaximo="cualquiera";
      }else{
        potencialMaximo=this.valorPotencial;
      }
      if(this.salario.length==0 || this.salario=="no" || this.valorSalario=="0"){
        salarioMaximo="cualquiera";
      }else{
        salarioMaximo=this.valorSalario;
      }
      if(this.precio=="no" || this.precio.length==0 || this.valorPrecio=="0"){
        precioMaximo="cualquiera";
      }else{
        precioMaximo=this.valorPrecio;
      }
      if(this.edad=="no" || this.edad.length==0){
        edadMaxima="cualquiera";
      }else{
        edadMaxima=this.valorEdad;
      }
      console.log("El valor es:"+edadMaxima);
      axios
        .get(direccionIp+"/dameJugadoresConFiltros",{
          params:{
            nacionalidad:nacionalidad,
            posicion:posicion,
            equipo:equipo,
            puntuacion:puntuacionMaxima,
            potencial:potencialMaximo,
            salario:salarioMaximo,
            precio:precioMaximo,
            edad:edadMaxima,
          },
        })
        .then(response=>{
          if(response.data[0]=="Según esos filtros, no hay jugadores"){
            alert(response.data[0]);
          }else{
            this.porFiltros(response.data);
          }
          //console.log(response.data);
        });
    }
  },
  watch:{
    salario:function () {
      if(this.salario=="si"){
        this.deseaMostrarSalario=true;
      }else{
        this.deseaMostrarSalario=false;
      }
    },
    puntuacion:function() {
      if(this.puntuacion=="si"){
        this.deseaMostrarPuntuacion=true;
      }else{
         this.deseaMostrarPuntuacion=false;
      }
    },
    potencial:function () {
      if(this.potencial=="si"){
        this.deseaMostrarPotencial=true;
      }else{
        this.deseaMostrarPotencial=false;
      }
    },
    precio:function () {
      if(this.precio=="si"){
        this.deseaMostrarPrecio=true;
      }else{
        this.deseaMostrarPrecio=false;
      }
    },
    edad:function () {
      if(this.edad=="si"){
        this.deseaMostrarEdad=true;
      }else{
        this.deseaMostrarEdad=false;
      }
    }
  }

};
</script>
