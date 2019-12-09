
import firebase from 'firebase/app'
import 'firebase/auth'
import { Notify } from 'quasar'

/**
 * Firebase's auth interfact method
 * https: //firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} currentUser object from firebase
 */
export const auth = () => {
  return firebase.auth()
}

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable
 *
 */
export const ensureAuthIsInitialized = async (store) => {
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}

/** Convienience method to initialize firebase app
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

/**
 * @param  {Object} store - Vuex store
 */
export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

/**
 * remove firebase auth token
 */
export const logoutUser = () => {
  return auth().signOut()
}

/** Handle the auth state of the user and
 * set it in the auth store module
 * @param  {Object} store - Vuex Store
 * @param  {Object} currentUser - Firebase currentUser
 */
export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthState = isAuthenticated(store)
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true,
    isSignedIn: currentUser !== null
  })

  // If the user looses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    store.dispatch('auth/routeUserToAuth')
  }
}

/**
 * @param  {Object} router - Vue Router
 * @param  {Object} store - Vuex Store
 */
export const routerBeforeEach = async (router, store) => {
  router.beforeEach(async (to, from, next) => {
    try {
      await ensureAuthIsInitialized(store)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated(store)) {
          next()
        } else {
          next('/auth/login')
        }
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
}
