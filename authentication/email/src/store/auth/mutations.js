/**
 * @param {Object} state - Vuex
 * @param data.isAuthenticated - Boolean value from:
 * src/services/firebase/base > handleOnAuthStateChanged
 * @param data.isAuthenticated - Boolean value from:
 * src/services/firebase/base > handleOnAuthStateChanged
 */
export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
}
