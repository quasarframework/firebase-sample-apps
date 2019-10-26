import * as base from '../services/firebase/base.js'

const firebaseService = Object.assign({}, base)

// "async" is optional
export default async () => {
  const config = process.env.environments.FIREBASE_CONFIG
  try {
    await firebaseService.fBInit(config)
    // Just a validation that our service structure is working
    // This does not guartee that the initialization happened
    // with a valid api key. This will be done when the app
    // performs any auth() functionality
    console.log('Firebase init called properly')
  } catch (err) {
    throw Error(`Error in firebase initilization: ${err}`)
  }
}
