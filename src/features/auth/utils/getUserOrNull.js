import { getCurrentUser } from "../api/getCurrentUser.js";

export const getUserOrNull = async () => {
  try {
    const res = await getCurrentUser();
    return res.data.user;
  } catch (err) {
    return null;
  }
};
