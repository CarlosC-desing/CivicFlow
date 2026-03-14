import axios from "axios";

export const apiCiciv = axios.create({
  baseURL: "http://localhost:3001",
});
