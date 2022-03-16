import { useState } from "react";

/** Form for logging in
 * 
 * Props:
 * - logIn: function to log the user in
 * 
 * State:
 * - formData: object of form fields and values
 * - errors: array of errors that may occur in the form
 * 
 * Router -> Login
 */

function Login({ logIn }) {
  const initialFormData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  // handles form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await logIn(formData);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }

  }

  // update field value on change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldForm => {
      return { ...oldForm, [name]: value }
    });
  }

  return (
    <div className="Login">
      <h2>Log in</h2>
      {error &&
        <p className="Login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="Login-email">Email</label>
        <input
          required
          id="Login-email"
          name="email"
          value={formData.email}
          type="email"
          onChange={handleChange}
        /> <br />
        <label htmlFor="Login-password">Password</label>
        <input
          required
          id="Login-password"
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
        /> <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;