import axios from "axios";

const custonFetch = axios.create({
  baseURL: "https://firstsalary.herokuapp.com",
});

export default custonFetch;
