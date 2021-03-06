import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path : '/blog/:username',
    name : 'blog',
    component : () => import('@/views/Blog.vue')
  },{
    path: '/newpost',
    name:'newpost',
    component : ()=>import('@/views/Newpost.vue')
  },
  {
    path : '/register',
    name : 'register',
    component : ()=>import('@/views/Register.vue')
  },
  {
    path : '/login',
    name : 'login',
    component : ()=>import('@/views/Login.vue')
  },
  {
    path : '/profile',
    name : 'profile',
    component : ()=>import('@/views/Profile.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
