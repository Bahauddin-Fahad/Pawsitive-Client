import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, signupUser } from "../services/AuthServices";
import toast from "react-hot-toast";
import { ISignup } from "../types";

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => {
      return toast.promise(loginUser(userData), {
        loading: "Loading...",
        success: "Logged in successfully!",
        error: "Error when creating post.",
      });
    },
  });
};

export const useUserSignup = () => {
  return useMutation<ISignup, Error, ISignup>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData) => {
      return toast.promise(signupUser(userData), {
        loading: "Loading...",
        success: "Account created successfully!",
        error: "Error when creating post.",
      });
    },
  });
};
