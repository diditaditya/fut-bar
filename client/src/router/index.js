import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Updateuser from '@/components/Updateuser'
import formRoom from '@/components/formRoom'

Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Updateuser',
      name: 'Updateuser',
      component: Updateuser
    },
    {
      path: '/formRoom',
      name: 'formRoom',
      component: formRoom
    }
  ]
})
