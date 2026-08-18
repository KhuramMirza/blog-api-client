import api from "../../../lib/axios.js";

export const updatePost = async (postId, updatedData) => {
  const response = await api.patch(`/posts/${postId}`, updatedData);
  return response.data;
};
