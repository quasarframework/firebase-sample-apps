export const createNewUser = async function ({ commit }, data) {
  const $fb = this.$fb
  const { email, password } = data
  return $fb.createUserWithEmail(email, password)
}

export const loginUser = async function ({ commit }, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function ({ commit }, payload) {
  const $fb = this.$fb
  await $fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}
