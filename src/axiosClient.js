// src/axiosClient.js
import axios from "axios";

// Remove trailing slash if it exists
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/$/, "");

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Optional: Log request URL in development
if (import.meta.env.DEV) {
  axiosClient.interceptors.request.use((config) => {
    console.log("API Request →", `${config.baseURL}${config.url}`);
    return config;
  });
}

export default axiosClient;
