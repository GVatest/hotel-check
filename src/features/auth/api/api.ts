import { IUser } from "../models";
import { Credentials } from "../types";

export const login = (credentials: Credentials) =>
  new Promise<IUser>((resolve) => {
    setTimeout(() => {
      console.log(credentials);
      localStorage.setItem("isLoggedIn", "true");
      resolve({ name: "user" });
    }, 1000);
  });

export const logout = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      resolve();
    }, 1000);
  });

export const checkAuth = () => {
  return localStorage.getItem("isLoggedIn") == "true";
};
