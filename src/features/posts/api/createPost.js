import api from "../../../lib/axios.js";

export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};
