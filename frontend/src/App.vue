<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row align="center" justify="center">
      <v-btn color="grey">Elegir jugador por mediante filtros</v-btn>
      <v-btn color="grey">Mejores promesas</v-btn>
      <v-btn color="grey">Mejores jugadores</v-btn>
      </v-row>
    </v-app-bar>
    <v-content>
      <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/FIFA_logo_without_slogan.svg/1200px-FIFA_logo_without_slogan.svg.png"></v-img>
    </v-content>
    <v-content>
      <v-layout row wrap>
        <v-flex v-for="jugador in listaJugadoresAleatorios" :key="jugador.id" >
        <v-card  color="#F57C00">
        <v-card-title>Nombre completo:{{jugador.nombreCompleto}}</v-card-title>
        <v-card-subtitle>ID:{{jugador.id}}</v-card-subtitle>
        <v-card-subtitle>Nacionalidad:{{jugador.salario}}</v-card-subtitle>
        <v-card-subtitle>Salario:{{jugador.salario}}</v-card-subtitle>
        <v-card-subtitle>Precio:{{jugador.precio}}</v-card-subtitle>
        <v-card-subtitle>Puntuación:{{jugador.puntuación}}</v-card-subtitle>
        <v-card-subtitle>Potencial:{{jugador.potencial}}</v-card-subtitle>
        <v-card-subtitle>Edad:{{jugador.edad}}</v-card-subtitle>
        <v-card-subtitle>Equipo Actual:{{jugador.equipo}}</v-card-subtitle>
        </v-card>
      </v-flex>
      </v-layout>
      
    </v-content>
      
    
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");
const direccionIp = "http://127.0.0.1:3000";
export default {
  name: "App",
  data(){
    return{
      listaJugadoresAleatorios:[]
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
    }
  },
};
</script>
