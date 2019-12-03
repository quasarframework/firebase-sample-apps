/** Class representing a User. */
export default class User {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} backgroundPhoto - A generated URL from Google Storage.
   * @param {String} email - A valid email.
   * @param {String} fullName - The user's full name.
   * @param {String} mobile - the user's mobile number.
   * @param {String} profilePhoto - A generated URL from Google Storage.
  */
  id = ''
  backgroundPhoto = ''
  email = ''
  fullName = ''
  mobile = ''
  profilePhoto = ''

  /**
   * @param  {Object} args - User arguments supplied during
   * user creation
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
