import { useMutation } from "@tanstack/react-query";
import { IUser } from "../types";
import { startPremium } from "../services/PaymentServices";

import toast from "react-hot-toast";

export const useStartPremium = (onSuccessCallback: any) => {
  return useMutation<any, Error, Partial<IUser>>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (payload) => {
      const response = await startPremium(payload);
      return response;
    },
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError: (error) => {
      toast.error("Error when giving payment: " + error.message);
    },
  });
};
