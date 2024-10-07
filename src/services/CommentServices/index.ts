"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IComment, IUpdateComment } from "@/src/types";
import { revalidateTag } from "next/cache";

export const createComment = async (commentData: IComment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", commentData);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getPostAllComments = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comments"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/comments?post=${postId}`,
    fetchOption
  );

  const data = await res.json();

  return data;
};

export const updateComment = async (
  id: string,
  updatedComment: IUpdateComment
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/comments/${id}`, updatedComment);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteComment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${id}`);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
