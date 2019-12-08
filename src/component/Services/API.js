import axios from "axios";
const APIURL = "http://localhost:4000/api/v1";
const APIServices = {
  login(login) {
    return axios.post(`${APIURL}/login`, login);
  },
  signUp(account) {
    return axios.post(`${APIURL}/users/save`, account);
  },
  async logout() {
    let token = window.localStorage.getItem("token");
    let headers = {
      token
    };
    window.localStorage.removeItem("isAuth");
    window.localStorage.removeItem("token");
    return await axios.get(`${APIURL}/logout`, { headers });
  },
  async Statistics() {
    let token = window.localStorage.getItem("token");
    let headers = {
      token
    };
    return await axios.get(`${APIURL}/statistics`, { headers });
  }
};
export default APIServices;
