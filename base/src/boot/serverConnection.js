import firebaseService from '../services/firebase'

export default async () => {
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  // Validation that our service structure is working
  // with a firebase app instance. Does not validate a
  // valid API key.
  console.log(firebaseService.auth())
}
