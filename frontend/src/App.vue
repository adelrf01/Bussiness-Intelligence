<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row align="center" justify="center">
      <v-btn color="grey">Elegir jugador por mediante filtros</v-btn>
      <v-btn color="grey">Mejores promesas</v-btn>
      <v-btn color="grey">Mejores jugadores</v-btn>
      </v-row>
    </v-app-bar>
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in fotos"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresAleatorios" :key="jugador.id" >
        <v-card  color="#F57C00" :elevation="20" max-height="470">
        <v-card-title>Nombre completo:{{jugador.nombreCompleto}}</v-card-title>
        <v-card-text>ID:{{jugador.id}}</v-card-text>
        <v-card-text>Nacionalidad:{{jugador.nacionalidad}}</v-card-text>
        <v-card-text>Salario:{{jugador.salario}}</v-card-text>
        <v-card-text>Precio:{{jugador.precio}}</v-card-text>
        <v-card-text>Puntuación:{{jugador.puntuacion}}</v-card-text>
        <v-card-text>Potencial:{{jugador.potencial}}</v-card-text>
        <v-card-text>Edad:{{jugador.edad}}</v-card-text>
        <v-card-text>Equipo Actual:{{jugador.equipo}}</v-card-text>
        <v-card-text>Posicion:{{jugador.posicion}}</v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");
const direccionIp = "http://127.0.0.1:3000";
/* eslint-disable */
export default {
  name: "App",
  data(){
    return{
      listaJugadoresAleatorios:[],
      listaPosicionesInglesAb:["RW","ST","LW","CAM","GK","CB","CDM","CF","CM","LM","RB","LB","RM","LWB","RWB"],
      listaPosicionesEspañolAb:["ED","DC","EI","MCO","POR","DFC","MCD","MP","MC","MI","LTD","LTI","MD","CAI","CAD"],
      listaPosicionesEspañol:["Extremo derecho","Delantero centro","Extremo izquierdo","Mediocentro ofensivo","Portero","Defensa central","Mediocentro defensivo","Mediapunta","Mediocentro","Medio izquierdo","Lateral derecho","Lateral izquierda","Medio derecho","Carrilero izquierdo","Carrilero derecho"],
      fotos:[
        {src:"https://live.staticflickr.com/3333/3580954073_0deb9ec98e_b.jpg"},
        {src:"https://estaticos.muyhistoria.es/uploads/images/pyr/5e6b70975bafe8622bcdb30f/REDES.jpg"},
        {src:"https://media.istockphoto.com/vectors/set-of-tournament-posters-of-football-or-soccer-league-design-of-for-vector-id950398608?b=1&k=6&m=950398608&s=612x612&w=0&h=6ePl4cGEUkNt72-xN6qD6DjYEkDHiB837iK9WLTCW2A="},
        {src:"https://p1.pxfuel.com/preview/849/991/808/stadium-crowded-football-people-event-spectators.jpg"}
      ]
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
    aleatorios(response){
      //pNueva = this.nuevoPrecio(response[0].precio);
      for(var i=0;i<response.length;i++){
        response[i].precio=this.nuevoPrecio(response[i].precio);
        response[i].salario=this.nuevoPrecio(response[i].salario);
        response[i].posicion=response[i].posicion+"/"+this.posicionEnEspañol(response[i].posicion);
        //console.log(response[i].posicion);
        this.listaJugadoresAleatorios.push(response[i]);
        //console.log(this.listaJugadoresAleatorios[i]);
        //console.log("sawfasdsadadawd:"+pNueva);
      }
    },
    nuevoPrecio(precio){
      var pos=precio.length;
      var precioNuevo="";
      var cont=0;
      for(var i=pos-1;i>=0;i--){
        cont++;
        precioNuevo=precio[i]+precioNuevo;
        if(cont%3==0){
          precioNuevo="."+precioNuevo;
        }
      }
      return precioNuevo;
    },
    posicionEnEspañol(posicion){
      var i =this.listaPosicionesInglesAb.indexOf(posicion);
      return this.listaPosicionesEspañol[i];
    }
  }
};
</script>
