<template>
  <div id="app">
    <navbar v-bind:sessiondetail="sessiondetail" v-on:logoutc="logout"></navbar>
    <router-view v-on:changesessionc="changesession" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      sessiondetail:{
          session:false,
          username:''

      }

    }
  },
  methods:{
    changesession(){
      let self=this
      if(self.sessiondetail.session==false){
        self.sessiondetail.session=true
      }else{
        self.sessiondetail.session=false
      }
    },
    logout(){
      let self=this
      self.sessiondetail.session=false
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('email')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('phone')
      window.localStorage.removeItem('username')
    }
  },
  created(){
    let self=this
    let token = window.localStorage.getItem('token')
    console.log(self.sessiondetail.session);
    if(token!==null && token!==undefined){
      self.sessiondetail.session=true
      self.sessiondetail.username= window.localStorage.getItem('username')
      console.log('==============================');
      console.log(self.sessiondetail.session);
      console.log(self.sessiondetail.username);
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
  background: url('./assets/background.jpg') no-repeat center center fixed;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
}
</style>
