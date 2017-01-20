import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require.ensure([], () => resolve(require('../modules/home/index.vue')), 'home/index')
const About = resolve => require.ensure([], () => resolve(require('../modules/about/index.vue')), 'about/index')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/Home',
      component: Home
    },
    {
      path: '/About',
      component: About
    },
    { path: '*', redirect: '/Home' }
  ]
})
