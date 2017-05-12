<template lang="html">
  <nav class="nav indigo darken-2">
    <div class="nav-wrapper" >
      <a  class="brand-logo"><router-link to="/home">FUT-BAR</router-link></a>
        <div v-if="sessiondetail.session">
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/formRoom">Create Room</router-link></li>

          <li class="left-align" ><a class="btn green waves-effect waves-light" to="/" >welcome, {{sessiondetail.username}}</a>   </li>
          <li><a @click="logoutc">Sign out</a></li>
          </ul>
        </div >
        <div v-else>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Sign in</router-link></li>
          </ul>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props:{
    sessiondetail:{
      session:{
        type:Boolean
      },
      username:{
        type:String
      }
    }
  },
  methods:{

    logoutc: function() {
      let self = this
      self.$router.push('/')
        self.$emit('logoutc')
    }
  },
  name: 'navbar',

}
</script>
<style lang="css">
#navbar{
    margin-top:60px
}
</style>
