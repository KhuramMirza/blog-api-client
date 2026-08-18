import api from "../../../lib/axios.js";

export const getMyPosts = async () => {
  const response = await api.get("/posts/me");
  return response.data;
};
