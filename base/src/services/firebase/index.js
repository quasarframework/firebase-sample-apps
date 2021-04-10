import * as base from './base.js'

/*
  Assign the base service to the firebaseServices namespace in the
  serviceConnection boot file. Over time other service modules separate by
  logic/concerns will be added here. Be aware of name conflicts between
  your modules.
*/
export default Object.assign({}, base)
