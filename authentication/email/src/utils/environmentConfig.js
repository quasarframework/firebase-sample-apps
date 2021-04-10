const ENV = require('dotenv').config().parsed
/*
  Use an environment variable set in package.json scripts to determine
  the applications runtime environment. Add more switch cases as
  need for additional environments. Remember, Firebase recomends supporting
  separate Firebase project for different application environments: httpsq://firebase.google.com/docs/projects/multiprojects#support_different_environments
*/

module.exports = (QENV) => {
  if (!['DEV', 'STAGE', 'PROD'].includes(QENV)) {
    throw Error('Unknonw or not supplied environment variable')
  }
  return {
    FIREBASE_CONFIG: {
      apiKey: ENV[`${QENV}_API_KEY`],
      authDomain: ENV[`${QENV}_AUTH_DOMAIN`],
      databaseURL: ENV[`${QENV}_DATA_BASE_URL`],
      projectId: ENV[`${QENV}_PROJECT_ID`],
      storageBucket: ENV[`${QENV}_STORAGE_BUCKET`],
      messagingSenderId: ENV[`${QENV}_MESSAGING_SENDER_ID`],
      appId: ENV[`${QENV}_APP_ID`]
    },
    API_ENDPOINT: ENV[`${QENV}_API_ENDPOINT`]
  }
}
