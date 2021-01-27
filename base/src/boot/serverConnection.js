import firebaseService from '../services/firebase'

export default async () => {
  const config = process.env.environments.FIREBASE_CONFIG
  const app = firebaseService.fBInit(config)

  // Validation that our service structure is working
  // with a Firebase application auth instance. Does not validate a
  // valid API key.
  console.log('Firebase App Instantiation:', app)
  console.log('Firebase Auth Module:', firebaseService.auth())
}
