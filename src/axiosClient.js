// src/axiosClient.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API BASE URL:", API_BASE_URL);


if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_URL environment variable is not set! Check Vercel env settings."
  );
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""), // remove trailing slash
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30s timeout
});

// Optional: Log requests in development preview only
if (import.meta.env.MODE !== "production") {
  axiosClient.interceptors.request.use((config) => {
    console.log("API Request →", `${config.baseURL}${config.url}`);
    return config;
  });
}

export default axiosClient;
