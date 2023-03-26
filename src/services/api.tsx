import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.VITE_URL_SERVICE?.toString(),
});
