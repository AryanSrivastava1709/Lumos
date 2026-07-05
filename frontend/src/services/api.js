import axios from "axios";

const api = axios.create({
  baseURL: "https://lumos-5wwe.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
