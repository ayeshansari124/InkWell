import { fetchWithCredentials } from "../config/api";

/* LOGIN */
export const loginUser = (payload) =>
  fetchWithCredentials("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

/* REGISTER */
export const registerUser = (payload) =>
  fetchWithCredentials("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

/* LOGOUT */
export const logoutUser = () =>
  fetchWithCredentials("/logout", { method: "POST" });

/* GET CURRENT USER */
export const getProfile = () =>
  fetchWithCredentials("/profile");
