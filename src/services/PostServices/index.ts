"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { ICreatePostData, IPost } from "@/src/types";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: ICreatePostData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts", formData);
    revalidateTag("posts");

    return data;
  } catch (error: any) {
    console.log(error.response ? error.response.data : error.message);
  }
};

export const getAllPostsNewsFeed = async (apiUrl: string) => {
  const res = await fetch(apiUrl, {
    next: {
      tags: ["posts"],
    },
  });
  const data = await res.json();

  return data;
};

export const getAllPostsDashboard = async (query?: string) => {
  try {
    const baseURL = `/posts/dashboard/users`;
    const endpoint = query ? `${baseURL}?${query}` : baseURL;
    const { data } = await axiosInstance.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
export const getSinglePost = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/posts/${id}`); // Log the entire response
    return res.data; // Ensure you're returning only the data
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Rethrow the error for React Query to catch
  }
};

export const updatePost = async (payload: Partial<IPost>, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${id}`, payload);

    revalidateTag("posts");

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

export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${id}`);

    revalidateTag("posts");

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
export const addUpvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/upvote`);
    revalidateTag("posts");

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

export const removeUpvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}/upvote`);

    revalidateTag("posts");

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

export const addDownvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/downvote`);

    revalidateTag("posts");

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

export const removeDownvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}/downvote`);

    revalidateTag("posts");

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
