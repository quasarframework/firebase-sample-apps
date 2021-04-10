/*
  Remember, we have access to our Vue instance not using
  an arrow function in our actions file. This allows us
  to create a scoped reference to our firebaseService - $fb
  That was assigned to the Vue instance earlier in our serviceConnection
  boot file.
*/

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
  return $fb.createUserWithEmail(email, password)
}

/**
 * @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.email - User's email
 * @param data.password - User's password
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > loginWithEmail
 */
export const loginUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  return $fb.loginWithEmail(email, password)
}

/**
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > logoutUser
 */
export const logoutUser = async function () {
  const $fb = this.$fb
  await $fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}
