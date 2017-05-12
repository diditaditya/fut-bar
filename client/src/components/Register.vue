<template lang="html">
  <div class="valign-wrapper row login-box">
    <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
      <form>
        <div class="card-content">
          <span class="card-title">Sign Up</span>
          <div class="row">
            <div class="input-field col s12">
              <label for="username">Username</label>
              <input v-model="username" type="text" class="validate" name="username" id="username" />
            </div>
            <div class="input-field col s12">
              <label for="password">Password </label>
              <input v-model="password" type="password" class="validate" name="password" id="password" />
            </div>
            <div class="input-field col s12">
              <label for="email">Email </label>
              <input v-model="email" type="email" class="validate" name="email" id="email" />
            </div>
            <div class="input-field col s12">
              <label for="phone">Phone </label>
              <input v-model="phone" type="text" class="phone" name="phone" id="phone" />
            </div>
            <a @click='register' class="btn green waves-effect waves-light">Sign Up </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {

  name: 'register',
  data(){
    return {

      username:'',
      password:'',
      email:'',
      phone:''
    }

  },
  methods:{
    register: function(){
      let self=this
        console.log(this.username);
        console.log(this.password);
          this.axios.post('http://localhost:3000/signup', {
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  phone: this.phone
              })

              .then(function(response) {
              console.log(response.data);
                if(response.data.status==='success'){
                  self.$router.push('/')

                }else{

                }

              });


    }

  }
}
</script>

<style lang="css" scoped>






</style>
