import axios from "axios";

const custonFetch = axios.create({
  baseURL: "https://jobs-api-06.herokuapp.com/api/v1",
});

export default custonFetch;
