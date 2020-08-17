import firebaseServices from '../services/firebase'
import { Notify } from 'quasar'
import { store } from '../store'
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // Navigational Guards
  Router.beforeEach(async (to, from, next) => {
    const {
      ensureAuthIsInitialized,
      isAuthenticated
    } = firebaseServices
    try {
      // Force the app to wait until Firebase has
      // finished its initialization, and handle the
      // authentication state of the user properly
      await ensureAuthIsInitialized(store)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated(store)) {
          next()
        } else {
          next('/auth/login')
        }
      } else if ((to.path === '/auth/register' && isAuthenticated(store)) ||
        (to.path === '/auth/login' && isAuthenticated(store))) {
        next('/user/profile')
      } else {
        next()
      }
    } catch (err) {
      Notify.create({
        message: `${err}`,
        color: 'negative'
      })
    }
  })

  return Router
}
