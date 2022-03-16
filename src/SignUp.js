import { useState } from "react";

/** Sign up form
 * 
 * Props: 
 * - signUp: function to sign up new user
 * 
 * State:
 * - formData: object of form data
 * 
 * Routes -> Signup
 */

function SignUp({ signUp }) {
  const initialFormData = {
    email: "",
    password: "",
    name: "",
    interests: "",
    hobbies: "",
    zipCode: "",
    radius: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signUp(formData);
    } catch (err) {
      console.log("Encountered error:", err);
      setError(err.response.data.error);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      {error &&
        <p className="SignUp-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="SignUp-email">Email</label>
        <input
          id="SignUp-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        /> <br />
        <label htmlFor="SignUp-password">Password</label>
        <input
          id="SignUp-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
        /> <br />
        <label htmlFor="SignUp-name">Name</label>
        <input
          id="SignUp-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /> <br />
        <label htmlFor="SignUp-interests">Interests</label>
        <input
          id="SignUp-interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        /> <br />
        <label htmlFor="SignUp-hobbies">Hobbies</label>
        <input
          id="SignUp-hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
        /> <br />
        <label htmlFor="SignUp-zipCode">Zip Code</label>
        <input
          id="SignUp-zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        /> <br />
        <label htmlFor="SignUp-radius">Radius</label>
        <input
          id="SignUp-radius"
          name="radius"
          value={formData.radius}
          onChange={handleChange}
          type="number"
        /> <br />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp;