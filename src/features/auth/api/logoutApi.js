import api from "../../../lib/axios.js";

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
