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


}

export default FrienderApi;