<template>
  <div id="app">
    <navbar v-bind:session="session" v-on:logoutc="logout"></navbar>
    <router-view v-on:changesessionc="changesession" ></router-view>
    <button type="button" name="button" ></button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      session:false
    }
  },
  methods:{
    changesession(){
      let self=this
      if(this.session==false){
        self.session=true
      }else{
        self.session=false
      }
    },
    logout(){
      let self=this
      self.session=false
      window.localStorage.removeItem('token')
    }
  },
  created(){
    let self=this
    let token = window.localStorage.getItem('token')
    if(token!==null && token!==undefined){
      self.session=true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;


}
body{
  background-image: url('./assets/background.jpg');
}
</style>
