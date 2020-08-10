// Remember, we have access to our Vue instance not using
// an arrow function in our actions file. This allows us
// to create a scoped reference to our firebaseService - $fb
// That was assigned to the Vue instance earlier in our serviceConnection
// boot file.

export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  return $fb.createUserWithEmail(email, password)
}

export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function ($root, payload) {
  const $fb = this.$fb
  await $fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}
