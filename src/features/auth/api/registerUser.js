import api from "../../../lib/axios.js";

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
