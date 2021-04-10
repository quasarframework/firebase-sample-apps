
import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Returns Firebase 's global namespace from which all Firebase services are accessed
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} Firebase Module
 */
export const self = () => {
  return firebase
}

/**
 * Returns Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @returns {Auth} - The Firebase Auth service interface
 */
export const auth = () => {
  return firebase.auth()
}

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable.
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
 * @param {Object} store - Vuex store
 * @returns {Promise} - A promise that return firebase.Unsubscribe
 */
export const ensureAuthIsInitialized = (store) => {
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}

/**
 * Convenience method to initialize firebase app
 * https://firebase.google.com/docs/reference/js/firebase?authuser=1#initializeapp
 * @param  {Object} config - FIREBASE_CONFIG during the build process
 * @returns {App} - Creates and initializes a Firebase app instance.
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

/**
 * Handle the auth state of the user and set it in the auth store module.
 * Also sets up redirection if the user loses authentication. The action
 * method will determine where the application routes to.
 * @param  {Object} store - Vuex Store
 * @param  {Object} currentUser - Firebase currentUser
 */
export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthState = isAuthenticated(store)
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true,
    uid: (currentUser ? currentUser.uid : '')
  })

  // Get & bind the current user
  if (store.state.auth.isAuthenticated) {
    await store.dispatch('user/getCurrentUser', currentUser.uid)
  }

  // If the user looses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    store.dispatch('auth/routeUserToAuth')
  }
}

/**
 * @param  {Object} store - Vuex store
 * @return {Boolean} - isAuthenticated
 */
export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

/**
 * Removes firebase auth token
 * @returns {Promise} - Void
 */
export const logoutUser = () => {
  return auth().signOut()
}
