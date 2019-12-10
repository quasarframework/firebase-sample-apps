import * as base from '../services/firebase/base.js'

const firebaseService = Object.assign({}, base)

export default async () => {
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  // Validation that our service structure is working
  // with a valid api key.
  console.log(firebaseService.auth(), 'Firebase has been initialized with a valid key')
}
