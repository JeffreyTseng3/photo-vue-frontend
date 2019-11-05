import Vue from 'vue'
import VueRouter from 'vue-router'

import Photos from "./views/Photos"
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import Collection from "./views/Collection";
import ShowPhoto from './views/ShowPhoto'
Vue.use(VueRouter)

const routes = [
  {
    path: '/photos',
    name: 'photos',
    component: Photos
  },
  { 
    path: "/photos/:id",
    component: ShowPhoto
  },
  {
    path: "*",
    redirect: "/photos"
  }, {
    path: "/sign-in",
    component: Signin
  },
  {
    path: "/sign-up",
    component: Signup
  },
  {
    path: "/collection",
    component: Collection
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
