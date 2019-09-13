import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Q:Poll - Create a new poll'
      },
      component: Home
    },
    {
      path: '/view/:id',
      name: 'poll',
      meta: {
        title: 'Q:Poll - Loading poll...'
      },
      component: () => import(/* webpackChunkName: "poll" */ './views/Poll.vue')
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        title: 'Q:Poll - Error'
      },
      component: () =>
        import(/* webpackChunkName: "error" */ './views/Error.vue')
    }
  ]
})
