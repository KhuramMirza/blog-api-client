import api from "./axios.js";

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
