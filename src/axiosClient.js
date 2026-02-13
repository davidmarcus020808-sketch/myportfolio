// src/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", // fallback for local dev
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
git remote add origin https://github.com/<your-username>/myportfolio.git
