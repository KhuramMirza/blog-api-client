import { getCurrentUser } from "../api/getCurrentUser.js";
import { redirect } from "react-router";

export const redirectIfLoggedIn = async () => {
  try {
    await getCurrentUser();
    throw redirect("/login");
  } catch (err) {
    if (err instanceof Response) throw err;
    return null;
  }
};
