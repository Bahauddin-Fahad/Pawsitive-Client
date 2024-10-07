"use server";

import jwt from "jsonwebtoken";
import { IUser } from "../types";
import envConfig from "../config/envConfig";
import { cookies } from "next/headers";

export const updateAccessTokenInCookies = (updatedUser: IUser) => {
  const secret = envConfig.jwt_access_secret;
  const expiresIn = envConfig.jwt_access_expires_in;

  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  if (!expiresIn) {
    throw new Error("JWT expiration is not defined or invalid");
  }

  try {
    const newAccessToken = jwt.sign(
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePhoto: updatedUser.profilePhoto,
        role: updatedUser.role,
        planType: updatedUser.planType,
        followers: updatedUser.followers,
        following: updatedUser.following,
        totalUpvote: updatedUser.totalUpvote,
        postCount: updatedUser.postCount,
        paymentStatus: updatedUser.paymentStatus,
        transactionId: updatedUser.transactionId,
        premiumStart: updatedUser.premiumStart,
        premiumEnd: updatedUser.premiumEnd,
        premiumCharge: updatedUser.premiumCharge,
      },
      secret,
      { expiresIn: expiresIn } // Ensure `expiresIn` is valid here
    );

    const oldAccessToken = cookies().get("accessToken")?.value;

    if (oldAccessToken) {
      cookies().delete("accessToken");
    }

    cookies().set("accessToken", newAccessToken);
  } catch (error) {
    console.error("Error signing JWT: ", error);
  }
};
