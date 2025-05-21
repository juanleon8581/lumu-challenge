import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.ransomware.live/v2",
  timeout: 10000,
});
