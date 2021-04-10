import firebaseServices from '../services/firebase'

export default ({ store, Vue }) => {
  firebaseServices.fBInit(process.env.QENV.FIREBASE_CONFIG)

  // Tell the application what to do when the
  // authentication state has changed
  firebaseServices.auth().onAuthStateChanged((user) => {
    firebaseServices.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseServices
  store.$fb = firebaseServices
}
