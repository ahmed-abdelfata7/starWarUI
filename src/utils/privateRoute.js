import React from "react";
import { Route } from "react-router-dom";
import Login from "./../component/Login/Login";
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return authenticated ? <Component {...props} /> : <Login />;
      }}
    />
  );
};
export default PrivateRoute;
