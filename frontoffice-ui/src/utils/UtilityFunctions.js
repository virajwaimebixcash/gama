import { actionCreators } from "../redux/actions/actionCreators";

/**
 * Finds the error for a given input field in a form.
 *
 * @param {Object} errors - An object containing form validation errors.
 * @param {string} name - The name of the input field to find the error for.
 * @returns {Object} - An object containing the error, or an empty object if no error is found.
 */
export function findInputError(errors, name) {

  const getNestedError = (errorObj, name) => {
    if (errorObj?.[name]) {
      return errorObj?.[name]
    }

    return null;
  };

  const error = getNestedError(errors, name);

  return error ? { error } : {};
};

/**
 * Checks if a form has any invalid fields.
 *
 * @param {Object} err - An object containing form validation errors.
 * @returns {boolean} - True if the form has any invalid fields, false otherwise.
 */
export const isFormInvalid = err => {
  if (Object.keys(err).length > 0) return true
  return false
};

/**
 * Logs out the user by dispatching actions to validate the logout, remove the user's token and name from local storage, and redirect the user to the home page.
 *
 * @param {function} dispatch - The Redux dispatch function to dispatch actions.
 * @returns {Promise} - A Promise that resolves when the logout process is complete.
 */
export const handleLogout = (dispatch, ip, navigate, isSessionExpired = true) => {
  const userName = localStorage.getItem('UserName');
  dispatch(actionCreators.validateLogout({
    userName: userName,
    isSessionExpired: isSessionExpired,
    hostName: window.location.hostname,
    ipAddress: ip
  })).then(() => {
    dispatch(actionCreators.validateLogin(null, true))
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("userIP");
    // window.location.href = '/react';
    navigate('/');
  })
    .catch((error) => {
      console.log(error);
    });
};


// utils/logoutUtils.js
// utils/logoutUtils.js



/** * Configures the STUN server to be used for the RTCPeerConnection.
    * STUN servers are used to discover the public IP address of a client behind a NAT or firewall.
    * This configuration sets the STUN server to `stun.l.google.com:19302`.
      */

export const getLocalIP = () => {
  return new Promise((resolve, reject) => {
    // Creating a new RTCPeerConnection object
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Using a STUN server
    });

    // Handling ICE candidate event to extract IP addresses
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Extracting the IP address from the candidate
        const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
        const ipAddress = ipRegex.exec(event.candidate.candidate);
        if (ipAddress) {
          resolve(ipAddress[0]); // Resolving the promise with the extracted IP
          peerConnection.onicecandidate = null; // Prevent further event triggers
        }
      }
    };

    // Creating a dummy data channel
    peerConnection.createDataChannel('');

    // Initiating the peer connection with an offer
    peerConnection.createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .catch((error) => reject(error));
  });
}
