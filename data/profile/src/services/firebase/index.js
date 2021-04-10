import * as base from './base.js'
import * as db from './db.js'
import * as email from './email.js'

/*
  Assign the base service to the firebaseServices namespace in the
  serviceConnection boot file. Over time other service modules separate by
  logic/concerns will be added here. Be aware of name conflicts between
  your modules.
*/
export default Object.assign({}, base, db, email)
