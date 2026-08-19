import api from "../../../lib/axios.js";

let authPromise = null;

export const getCurrentUser = async () => {
  if (authPromise) {
    return authPromise;
  }

  authPromise = api
    .get("/auth/me")
    .then((response) => {
      setTimeout(() => {
        authPromise = null;
      }, 1000);
      return response.data;
    })
    .catch((error) => {
      authPromise = null;
      throw error;
    });

  return authPromise;
};
