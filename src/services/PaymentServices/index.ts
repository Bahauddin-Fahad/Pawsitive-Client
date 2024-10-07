"use server";
import axiosInstance from "@/src/lib/AxiosInstance";

export const startPremium = async (payload: any) => {
  try {
    const { data } = await axiosInstance.put(
      "/users/premium/start-premium",
      payload
    );

    console.log(data);

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
