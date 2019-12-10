import React from "react";
import "./App.css";
import Login from "./component/Login/Login";
import SignupForm from "./component/Signup/Signup";
import Dashboard from "./component/Dashboard/Dashboard";
import Notifications from "react-notify-toast";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./utils/publicRoute";
import PrivateRoute from "./utils/privateRoute";
import { useSelector } from "react-redux";

function App() {
  let isLoggedin = useSelector(state => {
    return state;
  });
  const isAuth =
    window.localStorage.getItem("isAuth") || isLoggedin ? true : false;
  return (
    <Router>
      <Notifications options={{ zIndex: 200, top: "50px" }} />
      <Switch>
        <PublicRoute exact path="/" component={Login} authenticated={isAuth} />
        <PublicRoute
          exact
          path="/login"
          component={Login}
          authenticated={isAuth}
        />
        <PublicRoute
          exact
          path="/signup"
          component={SignupForm}
          authenticated={isAuth}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          authenticated={isAuth}
        />
        <PrivateRoute path="/logout" component={Login} authenticated={isAuth} />
      </Switch>
    </Router>
  );
}
export default App;
