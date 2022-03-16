import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Routes from "./Routes";
import FrienderApi from "./api";
import UserContext from "./userContext";
import './App.css';
import NavBar from './NavBar';

function App() {
  const [token, setToken] = useState(null);

  /** Sign up a new user */
  async function signUp({
    email,
    password,
    name,
    interests,
    hobbies,
    zipCode,
    radius
  }) {
    radius = Number(radius);
    const token = await FrienderApi.signUp(
      { email, password, name, interests, hobbies, zipCode, radius });
    setToken(token);
  }

  /** Log in user */
  async function logIn({ email, password }) {
    const token = await FrienderApi.logIn({ email, password });
    setToken(token);
  }

  /** Log out user */
  function logOut() {
    setToken(null);
  }

  // Set token on api
  useEffect(function () {
    FrienderApi.token = token;
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={
          { userId: token !== null ? jwt_decode(token) : null }}>
          <NavBar logOut={logOut} />
          <Routes formActions={{ signUp, logIn }} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
