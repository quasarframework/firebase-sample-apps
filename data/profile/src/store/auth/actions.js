/*
  Remember, we have access to our Vue instance not using
  an arrow function in our actions file. This allows us
  to create a scoped reference to our firebaseService - $fb
  That was assigned to the Vue instance earlier in our serviceConnection
  boot file.
*/

import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'
import { docRef } from '../../services/firebase/db.js'

export const addUserToUsersCollection = function (state, userRef) {
  const
    { email } = state,
    user = new User({ email })
  return userRef.set(user)
}

/**
 * @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.email - User's email
 * @param data.password - User's password
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > createUserWithEmail
 */
export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  const fbAuthResponse = await $fb.createUserWithEmail(email, password)
  const id = fbAuthResponse.user.uid
  const userRef = docRef('users', id)
  return addUserToUsersCollection({ email }, userRef)
}

/**
 * @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.email - User's email
 * @param data.password - User's password
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > loginWithEmail
 */
export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

/**
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > logoutUser
 */
export const logoutUser = async function ({ state }) {
  await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('currentUser') })
  this.$fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}
