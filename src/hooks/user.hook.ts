import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteUser,
  followUser,
  getAllUsers,
  unFollowUser,
  updateUser,
} from "../services/UserServices";
import { IUser } from "../types";
import { useUser } from "../context/user.provider";
import { updateAccessTokenInCookies } from "../utils/updateAccessTokenInCookies";

export const useGetAllUsers = (query?: string) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: query ? ["users", query] : ["users"],
    queryFn: async () => await getAllUsers(query || ""),
  });

  return { data, refetch, isLoading };
};

export const useFollowUser = () => {
  const { user, updateProfile } = useUser();

  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(followUser(id), {
        loading: "Following user...",
        success: `You followed ${name}!`,
        error: "Error when following user.",
      });
    },
    onSuccess: (data) => {
      if (user) {
        const updatedUser: IUser = {
          ...user,
          following: data?.following || user.following,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
  });
};

export const useUnfollowUser = () => {
  const { user, updateProfile } = useUser();

  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(unFollowUser(id), {
        loading: "Unfollowing user...",
        success: `You unfollowed ${name}!`,
        error: "Error when following user.",
      });
    },
    onSuccess: (data) => {
      if (user) {
        const updatedUser: IUser = {
          ...user,
          following: data?.following || user.following,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
  });
};

export const useUpdateUser = () => {
  const { user, updateProfile } = useUser();

  return useMutation<any, Error, { userData: Partial<IUser>; id: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userData, id }) => await updateUser(userData, id),
    onSuccess: (_data, { userData }) => {
      if (user) {
        const updatedUser: IUser = {
          _id: user._id,
          name: userData.name || user.name,
          email: userData.email || user.email,
          profilePhoto: userData.profilePhoto || user.profilePhoto,
          role: userData.role || user.role,
          planType: userData.planType || user.planType,
          followers: userData.followers || user.followers,
          following: userData.following || user.following,
          totalUpvote: userData.totalUpvote || user.totalUpvote,
          postCount: userData.postCount || user.postCount,
          paymentStatus: userData.paymentStatus || user.paymentStatus || "",
          transactionId: userData.transactionId || user.transactionId || "",
          premiumStart: userData.premiumStart || user.premiumStart,
          premiumEnd: userData.premiumEnd || user.premiumEnd,
          premiumCharge: userData.premiumCharge || user.premiumCharge || 0,
          isDeleted: userData.isDeleted || user.isDeleted,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
  });
};

export const useUpdateRole = () => {
  return useMutation<any, Error, { userData: Partial<IUser>; id: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userData, id }) => await updateUser(userData, id),
  });
};
export const useDeleteUser = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async ({ id }) => await deleteUser(id),
  });
};
