import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

/**
 * @interface Firestore
 * https://firebase.google.com/docs/reference/js/firebase.firestore#callable
 *
 * @return {Object} - Firestore
 */
export const firestore = () => {
  return firebase.firestore()
}
/**
 * @param  {String} collectionName - Firestore collection name
 * @param  {String} id - Uid to assign to a doc in firestore collection
 * @returns {Object} - DcoumentReferecne https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference
 */
export const docRef = (collectionName, id) => {
  return firestore().collection(collectionName).doc(id)
}

/**
 * @param  {String} storageLocation - Location on Firebase Storage
 * @returns {Object} Reference to a Google Cloud Storage object.
 */
export const storageRef = (storageLocation) => {
  return firebase.storage().ref(storageLocation)
}
