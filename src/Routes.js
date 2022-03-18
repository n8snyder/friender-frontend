import { Route, Switch, Redirect } from "react-router-dom";
import EditProfile from "./EditProfile";
import FindFriends from "./FindFriends";
import Home from "./Home";
import Login from "./Login";
import Signup from "./SignUp";

/** Routes for friender
 * 
 * Props:
 * - formActions: object of functions that forms will need to call on submit
 */

function Routes({ formActions }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup signUp={formActions.signUp} />
      </Route>
      <Route exact path="/login">
        <Login logIn={formActions.logIn} />
      </Route>
      <Route exact path="/profile/edit">
        <EditProfile />
      </Route>
      <Route exact path="/users/nearby">
        <FindFriends />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;