import { getUserOrNull } from "./getUserOrNull.js";
import { redirect } from "react-router";

export const requireAuth = async () => {
  try {
    return await getUserOrNull();
  } catch (err) {
    console.log(err);
    throw redirect("/login");
  }
};
