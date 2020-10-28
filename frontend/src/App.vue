<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row align="center" justify="center">
        <v-btn color="grey" @click="jugadoresAleatorios">Jugadores aleatorios</v-btn>
        <v-btn color="grey" @click="filtros">Elegir jugador por mediante filtros</v-btn>
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
      <v-content v-show="mostrarJugadoresAleatorios">
        <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresAleatorios" :key="jugador.id" >
        <v-card  color="#F57C00" :elevation="20" max-height="520">
        <v-card-title>Nombre completo:{{jugador.nombreCompleto}}</v-card-title>
        <v-card-text>
          ID:{{jugador.id}}
          <br/>
          Nombre Completo:{{jugador.nombreCompleto}}
          <br/>
          Nacionalidad:{{jugador.nacionalidad}}
          <br/>
          Precio:{{jugador.precio}}
          <br/>
          Salario:{{jugador.salario}}
          <br/>
          Puntuacion:{{jugador.puntuacion}}
          <br/>
          Potencial:{{jugador.potencial}}
          <br/>
          Edad:{{jugador.edad}}
          <br/>
          Equipo Actual:{{jugador.equipo}}
          <br/>
          Posicion:{{jugador.posicion}}
        </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
      </v-content>
    <v-content>
    <v-content v-show="mostrarPorFiltros">
        <v-card color="indigo darken-2">
          <v-toolbar color="indigo darken-1">
            <v-select :items="nacionalidades" label="nacionalidades" solo v-model="pais" dense outline/>
            <v-select :items="listaPosicionesEspañol" label="Posicion" solo v-model="posicion" dense outline/>
            <v-select :items="listaEquipos" label="Equipos" solo v-model="equipo" dense outline/>

          </v-toolbar>
        </v-card>
    </v-content>
      <router-view/>
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
      listaJugadoresAleatorios:[],
      listaPosicionesInglesAb:["RW","ST","LW","CAM","GK","CB","CDM","CF","CM","LM","RB","LB","RM","LWB","RWB"],
      listaPosicionesEspañolAb:["ED","DC","EI","MCO","POR","DFC","MCD","MP","MC","MI","LTD","LTI","MD","CAI","CAD"],
      listaPosicionesEspañol:["Extremo derecho","Delantero centro","Extremo izquierdo","Mediocentro ofensivo","Portero","Defensa central","Mediocentro defensivo","Mediapunta","Mediocentro","Medio izquierdo","Lateral derecho","Lateral izquierda","Medio derecho","Carrilero izquierdo","Carrilero derecho"],
      fotos:[
        {src:"https://live.staticflickr.com/3333/3580954073_0deb9ec98e_b.jpg"},
        {src:"https://estaticos.muyhistoria.es/uploads/images/pyr/5e6b70975bafe8622bcdb30f/REDES.jpg"},
        {src:"https://media.istockphoto.com/vectors/set-of-tournament-posters-of-football-or-soccer-league-design-of-for-vector-id950398608?b=1&k=6&m=950398608&s=612x612&w=0&h=6ePl4cGEUkNt72-xN6qD6DjYEkDHiB837iK9WLTCW2A="},
        {src:"https://p1.pxfuel.com/preview/849/991/808/stadium-crowded-football-people-event-spectators.jpg"}
      ],
      nacionalidades:[],
      pais:"",
      posicion:"",
      listaEquipos:[],
      equipo:""
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
      this.mostrarPorFiltros=!this.mostrarPorFiltros;
      this.rellenarNacionalidades();
      this.listaPosicionesEspañol.push("Cualquiera");
      this.rellenarEquipos();
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
          console.log(respuesta.data);
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
    jugadoresAleatorios(){
      this.listaJugadoresAleatorios=[];
      axios
        .get(direccionIp+"/dameJugadoresAleatorios")
        .then(response=>{
          this.aleatorios(response.data);
      });
      this.mostrarJugadoresAleatorios=!this.mostrarJugadoresAleatorios;
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
