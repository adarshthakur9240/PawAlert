import axios from "axios";

// client/src/configs/api.js
const api = axios.create({
  baseURL: "http://localhost:5001", // Isse bhi 5001 kar do
  withCredentials: true,
});

export default api;