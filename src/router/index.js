import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Case1 from '../views/Case1.vue'
import Case2 from '../views/Case2.vue'
import Case3 from '../views/Case3.vue'
import Case4 from '../views/Case4.vue'
import Case5 from '../views/Case5.vue'
import Case6 from '../views/Case6.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/case1',
    component: Case1
  },,
  {
    path: '/case2',
    component: Case2
  },
  {
    path: '/case3',
    component: Case3
  },
  {
    path: '/case4',
    component: Case4
  },
  {
    path: '/case5',
    component: Case5
  },
  {
    path: '/case6',
    component: Case6
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
