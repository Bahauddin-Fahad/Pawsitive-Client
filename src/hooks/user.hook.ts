import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { followUser, unFollowUser } from "../services/UserServices";

export const useFollowUser = () => {
  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(followUser(id), {
        loading: "Following user...",
        success: `You followed ${name}!`,
        error: "Error when following user.",
      });
    },
  });
};

export const useUnfollowUser = () => {
  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(unFollowUser(id), {
        loading: "Unfollowing user...",
        success: `You unfollowed ${name}!`,
        error: "Error when following user.",
      });
    },
  });
};
