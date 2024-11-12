import axios from "axios";

// Backend Variable
const API_URL = "http://localhost:5000/api/v1";

// Instantiate the axios instance on base url
const BACKEND_API = axios.create({
  baseURL: API_URL,
  headers: { "X-Origin": "Cre8pay_App" },
});

// export API instance
export default BACKEND_API;
