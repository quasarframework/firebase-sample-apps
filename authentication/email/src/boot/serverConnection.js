import * as base from '../services/firebase/base.js'
import * as email from '../services/firebase/email.js'

const firebaseService = Object.assign({}, base, email)

export default ({ router, store, Vue }) => {
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  // Tell the application what to do when the
  // authentication state has changed
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  // Setup the router to be intercepted on each route.
  // This allows the application to halt rendering until
  // Firebase is finished with its initialization process,
  // and handle the user accordingly
  firebaseService.routerBeforeEach(router, store)

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
