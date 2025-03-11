
class UserDetails {
  constructor() {
    this.token = '';
    this.userDetails = {};
  }

  setToken(token) {
    this.token = token;
  }


  setUserDetails(details) {
    this.userDetails = details;
  }
  removeDetails() {
    this.token = '';
    this.userDetails = '';
  }
}

/**
 * Creates a new instance of the `UserDetails` class, which is responsible for managing user details and authentication tokens.
 */
const userDetails = new UserDetails();
export default userDetails;