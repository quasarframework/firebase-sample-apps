import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

/**
 * Firestore
 * https: //firebase.google.com/docs/reference/js/firebase.firestore.Firestore.html
 *
 * @return {Interface} returns Firestore
 */
export const firestore = () => {
  return firebase.firestore()
}
/**
 * @param  {String} collectionName - Firestore collection name
 * @param  {String} id - Uid to assign to doc in firestore collection
 */
export const userRef = (collectionName, id) => {
  return firestore().collection(collectionName).doc(id)
}
/**
 * @param  {String} storageLocation - Location on Firebase Storage
 */
export const storageRef = (storageLocation) => {
  return firebase.storage().ref(storageLocation)
}

/**
 * @param  {DocRef} storageRef
 * @param  {Object} file
 */
export const storagePut = (storageRef, file) => {
  return storageRef.put(file)
}
