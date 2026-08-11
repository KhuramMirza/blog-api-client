import api from "./axios.js";

export const registerApi = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
