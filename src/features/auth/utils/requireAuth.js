import { redirect } from "react-router";
import { getCurrentUser } from "../api/getCurrentUser.js";

export const requireAuth = async () => {
  try {
    const res = await getCurrentUser();
    return res.data.user;
  } catch (err) {
    console.log(err);
    throw redirect("/login");
  }
};
