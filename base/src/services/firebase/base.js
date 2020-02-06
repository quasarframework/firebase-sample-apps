import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Returns Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Interface} The Firebase Auth service interface
 */
export const auth = () => {
  return firebase.auth()
}

/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}
