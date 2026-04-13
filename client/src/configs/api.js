import axios from "axios";

const API = axios.create({ 
  baseURL: "https://pawalert-j5al.onrender.com/api" 
});

export default API;
