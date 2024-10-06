"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { ISignup } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const response: any = await nexiosInstance.post("/auth/login", userData);

    if (response.data.success) {
      cookies().set("accessToken", response.data?.data?.accessToken);
      cookies().set("refreshToken", response.data?.data?.refreshToken);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signupUser = async (userData: ISignup) => {
  try {
    const response: any = await axiosInstance.post("/auth/signup", userData);
    console.log("r", response);

    if (response.data.success) {
      cookies().set("accessToken", response.data?.data?.accessToken);
      cookies().set("refreshToken", response.data?.data?.refreshToken);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      planType: decodedToken.planType,
      profilePhoto: decodedToken.profilePhoto,
      followers: decodedToken.followers,
      following: decodedToken.following,
      totalUpvote: decodedToken.totalUpvote,
      postCount: decodedToken.postCount,
      paymentStatus: decodedToken.paymentStatus,
      transactionId: decodedToken.transactionId,
      premiumStart: decodedToken.premiumStart,
      premiumEnd: decodedToken.premiumEnd,
      premiumCharge: decodedToken.premiumCharge,
    };
  }

  return decodedToken;
};
