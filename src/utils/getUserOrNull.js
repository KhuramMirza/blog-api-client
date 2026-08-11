import { getCurrentUserApi } from "../api/getCurrentUserApi.js";

export const getUserOrNull = async () => {
  console.log("loader running"); // ← add this
  try {
    const res = await getCurrentUserApi();
    console.log("user fetched:", res.data.user); // ← and this
    return res.data.user;
  } catch (err) {
    console.log("loader caught error:", err); // ← and this
    return null;
  }
};
