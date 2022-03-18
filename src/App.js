import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Routes from "./Routes";
import FrienderApi from "./api";
import UserContext from "./userContext";
import './App.css';
import NavBar from './NavBar';

function App() {
  /** Used as callback to set the initial user as null or from storage */
  function getInitialUser() {
    return (JSON.parse(localStorage.getItem("user")) || null);
  }
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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
    const newToken = await FrienderApi.signUp(
      { email, password, name, interests, hobbies, zipCode, radius });
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  /** Log in user */
  async function logIn({ email, password }) {
    const newToken = await FrienderApi.logIn({ email, password });
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  /** Log out user */
  function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  useEffect(function fetchUserWhenTokenChange() {
    FrienderApi.token = token;
    async function fetchUser() {
      const userId = jwt_decode(token).user_id;
      const userData = (await FrienderApi.getCurrentUser(userId)).user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    if ((token !== null) && (user === null)) {
      fetchUser();
    }
  }, [token, user]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user }}>
          <NavBar logOut={logOut} />
          <Routes formActions={{ signUp, logIn }} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
