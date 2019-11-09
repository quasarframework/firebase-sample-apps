import * as base from '../services/firebase/base.js'
import * as email from '../services/firebase/email.js'

const firebaseService = Object.assign({}, base, email)

// "async" is optional
export default ({
  router,
  store,
  Vue
}) => {
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  // Auth
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  // Setup the router to be intercepted
  firebaseService.routerBeforeEach(router, store)

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
