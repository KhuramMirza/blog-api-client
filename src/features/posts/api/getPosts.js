import api from "../../../lib/axios.js";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};
