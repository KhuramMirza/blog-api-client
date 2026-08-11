import { getCurrentUserApi } from "../api/getCurrentUserApi.js";
import { redirect } from "react-router";

export const redirectIfLoggedIn = async () => {
  try {
    await getCurrentUserApi();
    throw redirect("/");
  } catch (err) {
    if (err instanceof Response) throw err;
    return null;
  }
};
