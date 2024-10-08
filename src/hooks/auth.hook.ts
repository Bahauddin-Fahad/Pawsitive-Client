import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, signupUser } from "../services/AuthServices";
import toast from "react-hot-toast";
import { ISignup } from "../types";

export const useUserLogin = (onSuccessCallback: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => {
      const response = await loginUser(userData);
      return response;
    },
    onSuccess: (data) => {
      onSuccessCallback(data); // Call the provided callback with the response data
    },
    onError: (error) => {
      toast.error("Error when signing in: " + error.message);
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
