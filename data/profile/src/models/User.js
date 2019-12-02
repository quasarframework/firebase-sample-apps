/** Class representing a User. */

export default class User {
  id = ''
  backgroundPhoto = ''
  email = ''
  fullName = ''
  mobile = ''
  profilePhoto = ''

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
