import axios from "axios";

// const baseURL = "http://localhost:1337/logs/";
// const loginURL = "http://localhost:1337/login/";
// const registerURL = "http://localhost:1337/register/";
// const logoutURL = "http://localhost:1337/logout/";
// const getUserURL = "http://localhost:1337/user/";

// const baseURL = process.env.BASE_URL;
// const loginURL = process.env.LOGIN_URL;
// const registerURL = process.env.REGISTER_URL;
// const logoutURL = process.env.LOGOUT_URL;
// const getUserURL = process.env.USER_URL;

const baseURL = "https://floating-journey-41713.herokuapp.com/logs/";
const loginURL = "https://floating-journey-41713.herokuapp.com/login/";
const registerURL = "https://floating-journey-41713.herokuapp.com/register/";
const logoutURL = "https://floating-journey-41713.herokuapp.com/logout/";
const getUserURL = "https://floating-journey-41713.herokuapp.com/user/";

axios.defaults.withCredentials = true;

const handleError = (fn) => (...params) =>
  fn(...params).catch((error) => (
      <strong>`${ error.response.status }: ${ error.response.statusText }`</strong>
  ));

export const api = {
  login: handleError(async (payload) => {
    const res = await axios.post(loginURL, payload);
    return res.data;
  }),
  register: handleError(async (payload) => {
    const res = await axios.post(registerURL, payload);
    return res.data;
  }),
  getUser: handleError(async (id) => {
    const res = await axios.get(getUserURL, id);
    return res.data;
  }),
  logout: handleError(async (payload) => {
    const res = await axios.get(logoutURL, payload);
    return res.data;
  }),
  getLog: handleError(async (id) => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getLogs: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteLog: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createLog: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateLog: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  })
};
