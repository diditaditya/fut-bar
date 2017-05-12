<template lang="html">
  <nav class="nav indigo darken-2">
    <div class="nav-wrapper" >
      <a  class="brand-logo"><router-link to="/home">FUT-BAR</router-link></a>
        <div v-if="session">
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/Updateprofile">Update Profile</router-link></li>
          <li><router-link to="/">Create Room</router-link></li>
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
    session:{
      type:Boolean
    }
  },
  methods:{
    logoutc: function() {
        var self = this
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
