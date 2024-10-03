"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IRegister } from "@/src/types";
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

export const registerUser = async (userData: IRegister) => {
  try {
    const response: any = await axiosInstance.post("/auth/register", userData);

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
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
      followers: decodedToken.followers,
      following: decodedToken.following,
      isVerified: decodedToken.isVerified,
      totalUpvote: decodedToken.totalUpvote,
      postCount: decodedToken.postCount,
    };
  }

  return decodedToken;
};
