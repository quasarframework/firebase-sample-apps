import { firestoreAction } from 'vuexfire'
import { userRef, storagePut, storageRef } from '../../services/firebase/db.js'
import { Notify } from 'quasar'

/** getUser - Get current user from the firestore
 * collection user's via firebase uid
 * @param  {Ojbect} payload.id - Firebase currentUser id
 */
export const getCurrentUser = firestoreAction(async function ({ bindFirestoreRef }, id) {
  return bindFirestoreRef('currentUser', userRef('users', id))
})

/**
 * @param  {Object} {state}
 * @param  {Object} payload
 */
export const submitPhotoImage = async function ({ state }, payload) {
  const { id, file, fileSuffix, photoType } = payload
  try {
    const profileImageStorageRef = await storageRef(`${id}/${photoType}Photo/${photoType}Photo.` + fileSuffix)
    const snapShot = await storagePut(profileImageStorageRef, file)
    const link = await snapShot.ref.getDownloadURL()
    await userRef('users', id).update({ [`${photoType}Photo`]: link })
    return link
  } catch (err) {
    console.error(err)
    Notify.create({
      message: `Looks like there is an issue with updating your profile photo: ${err}`,
      color: 'negative'
    })
  }
}

/**
 * @param  {Object} {state}
 * @param  {String} id
 * @param  {Object} payload
 */
export const updateUserData = async function ({ state }, payload) {
  try {
    await Promise.all([
      userRef('users', payload.id).update(payload)
    ])
  } catch (err) {
    Notify.create({
      message: `Looks like a probelm updating your profile: ${err}`,
      color: 'negative'
    })
  }
}
