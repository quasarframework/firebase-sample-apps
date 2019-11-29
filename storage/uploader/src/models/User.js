/** Class representing a User. */

export default class User {
  id = ''
  backgroundPhoto = ''
  cityState = ''
  email = ''
  fullName = ''
  mobile = ''
  DOB = ''
  personaType = ''
  profilePhoto = ''
  status = 'active'
  street = ''
  zipCode = ''

  /**
   * @param  {Object} args - User args
   */
  constructor (args) {
    Object.keys(args).forEach((v, i) => {
      this[v] = args[v]
    })

    return {
      ...this
    }
  }
}
