import { firestoreAction } from 'vuexfire'
import { docRef } from '../../services/firebase/db.js'

/** Get current user from the firestore collection user's
 * via firebase uid
 * @param  {String} id - Firebase currentUser id
 * @returns {Function} bindFirestoreRef - https://vuefire.vuejs.org/api/vuexfire.html#bindfirestoreref
 */
export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, id) => {
  return bindFirestoreRef('currentUser', docRef('users', id))
})

/**
* @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.id - Firestore document id
 * @param {Object} data - User's data to be updated
 * @returns {Function} - Firebase services function:
 * src/services/firebase/db.js > docRef
 */
export const updateUserData = async function ($root, data) {
  return docRef('users', data.id).update(data)
}
