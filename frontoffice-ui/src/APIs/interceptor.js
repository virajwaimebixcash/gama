
import axios from 'axios';
import userDetails from './userDetails';
import { handleLogout } from '../utils/UtilityFunctions';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});


/**
 * Adds an authorization header to the request config if a valid token is available.
 *
 * This interceptor is used to automatically add the authorization header to all outgoing requests.
 * It checks if a valid token is available in the `userDetails` module, and if so, adds it to the
 * `Authorization` header of the request config.
 *
 * @param {Object} config - The request config object.
 * @param {string} [config.headers.Authorization] - The authorization header value.
 * @returns {Object} - The modified request config object.
 */
api.interceptors.request.use(
  (config) => {
    const token = userDetails.token;
    if (token && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    if (response.data.status === 'Failure') {
      if (response.data.errMsg) {
        return Promise.reject(response.data.errMsg?.map(e => e.errMessage).join(', '));

      }
      return Promise.reject(response.data.message || 'Something went wrong');
    }
    return response;
  },
  (error) => {
    if (error?.response?.data?.message?.toLowerCase() === 'session has expired') {
      localStorage.removeItem('token');
      localStorage.removeItem('UserName');
      userDetails.setToken('')
      window.location.href = '/react/';
    }    
    return Promise.reject(error?.response?.data?.message || 'Something went wrong');
  }
);


export default api;