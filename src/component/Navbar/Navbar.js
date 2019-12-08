import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import ApiService from "./../Services/API";
import { SignOut } from "./../../actions/index";
import { useSelector, useDispatch } from "react-redux";
const NavbarLink = props => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to={props.to}>
        {props.label}
      </NavLink>
    </li>
  );
};

const Navbar = props => {
  let loggedInState = useSelector(state => {
    return state;
  });
  const isAuth = window.localStorage.getItem("isAuth") || loggedInState;
  const dispatch = useDispatch();
  const logout = async () => {
    await ApiService.logout();
    dispatch(SignOut());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Star Wars
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {isAuth ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/logout"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <Fragment>
              <NavbarLink to="/signup" label="signup" />
              <NavbarLink to="/login" label="login" />
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
