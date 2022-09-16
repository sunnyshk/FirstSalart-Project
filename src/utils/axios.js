import axios from "axios";

const custonFetch = axios.create({
  baseURL: "https://www.jobify.live/api/v1",
});

export default custonFetch;
