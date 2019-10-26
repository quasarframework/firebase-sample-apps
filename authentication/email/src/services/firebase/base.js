import firebase from 'firebase/app'
import 'firebase/auth'

/** Convienience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}
