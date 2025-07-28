// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // make sure you're using the Vite proxy
  withCredentials: true,
});

export default api;
