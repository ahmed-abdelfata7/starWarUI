import React, { useState } from "react";
import SWButton from "./../SWButton/SWButton";
import "./Dashboard.css";
import { SignOut } from "./../../actions/index";
import { useDispatch } from "react-redux";
import ApiService from "./../Services/API";
import Answer from "./../Answer/Answer";
const Dashboard = props => {
  const [statistics, updateStatistics] = useState({
    openingCrawl: "",
    perssonAppeared: "",
    mostSpeciesAppeared: "",
    plantWithPilots: "",
    error: true
  });
  const dispatch = useDispatch();
  const logout = async props => {
    await ApiService.logout();
    dispatch(SignOut());
  };
  const allStatistics = async () => {
    let result = await ApiService.Statistics();
    let check = result.data.success;
    let data = result.data.data;
    if (check) {
      updateStatistics({
        openingCrawl: data.openingCrawl,
        personAppeared: data.personAppeared,
        mostSpeciesAppeared: data.mostSpeciesAppeared,
        plantWithPilots: data.plantWithPilots,
        error: false
      });
    } else {
      updateStatistics({
        error: true
      });
    }
  };
  return (
    <div className="starWars">
      <button
        className="logoutBtn"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/320px-Star_Wars_Logo.svg.png"
        alt="star wars logo"
      />
      <SWButton
        className="swbtn btnOverwrite"
        onClick={() => {
          allStatistics();
        }}
      >
        Do.Or do not.There is no try
      </SWButton>
      {!statistics.error ? <Answer answer={statistics} /> : null}
    </div>
  );
};
export default Dashboard;
