import axios from "axios";

const instance = axios.create({
  baseURL: "https://coded-projects-api.herokuapp.com/api",
});

export default instance;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
