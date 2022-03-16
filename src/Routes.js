import { Route, Switch, Redirect } from "react-router-dom";
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
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;