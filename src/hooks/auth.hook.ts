import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../services/AuthServices";
import toast from "react-hot-toast";
import { IRegister } from "../types";

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

export const useUserRegistration = () => {
  return useMutation<IRegister, Error, IRegister>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => {
      return toast.promise(registerUser(userData), {
        loading: "Loading...",
        success: "Account created successfully!",
        error: "Error when creating post.",
      });
    },
  });
};
