import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token");
// Set the Authorization header with the bearer token
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
