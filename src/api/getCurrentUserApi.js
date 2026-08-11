import api from "./axios.js";

export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
