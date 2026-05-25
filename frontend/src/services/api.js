import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer-koea.onrender.com/api",
});

export default API;