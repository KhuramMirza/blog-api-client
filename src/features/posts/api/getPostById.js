import api from "../../../lib/axios.js";

export const getPostById = async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
};
