import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class
 * 
 * Contains all API calls to friender backend
 * 
 */

class FrienderApi {
  static token = null;


  /** Sign Up api
   * 
   * Params:
   * - email: string
   * - password: string
   * - name: string
   * - interests: string
   * - hobbies: string
   * - zipCode: string
   * - radius: number
   * 
   * Returns: 
   * - token: string
   */

  static async signUp({
    email,
    password,
    name,
    interests,
    hobbies,
    zipCode,
    radius
  }) {
    const res = await axios.post(`${BASE_URL}/signup`,
      { email, password, name, interests, hobbies, zip_code: zipCode, radius });
    return res.data.token;
  }

  /** Log In api 
   * 
   * Params:
   * - email: string
   * - password: string
   * 
   * Returns: 
   * - token: string
  */

  static async logIn({ email, password }) {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    return res.data.token;
  }


  /** Upload picture api */

  static async uploadPicture(fileData) {
    const res = await axios.post(`${BASE_URL}/pictures`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${FrienderApi.token}`
      }
    });
    return res.data;
  }

  /** Delete picture api */

  static async deletePicture(id) {
    const res = await axios.delete(`${BASE_URL}/pictures/${id}`, {
      headers: {
        Authorization: `Bearer ${FrienderApi.token}`
      }
    });
    return res.data;
  }


  /** Get users that are nearby */

  static async getUsers({ radius, zipCode, numUsers = 10 }) {
    const res = await axios.get(`${BASE_URL}/users`, {
      params: {
        radius,
        zip_code: zipCode,
        num_users: numUsers
      },
      headers: {
        Authorization: `Bearer ${FrienderApi.token}`
      }
    });

    return res.data;
  }

  /** Get details on current user api */

  static async getCurrentUser(id) {
    const res = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${FrienderApi.token}`
      }
    });

    return res.data;
  }


  /** Get user's pictures */

  static async getPictures(userId) {
    const res = await axios.get(`${BASE_URL}/users/${userId}/pictures`, {
      headers: {
        Authorization: `Bearer ${FrienderApi.token}`
      }
    });
    return res.data;
  }

}

export default FrienderApi;