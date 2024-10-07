import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IComment, IUpdateComment } from "../types";
import {
  createComment,
  deleteComment,
  getPostAllComments,
  updateComment,
} from "../services/CommentServices";

export const useCreateComment = () => {
  return useMutation<IComment, Error, IComment>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (commentData) => {
      return toast.promise(createComment(commentData), {
        loading: "Loading...",
        success: "You added a new comment!",
        error: "Something is Wrong!",
      });
    },
  });
};

export const useGetPostAllComments = (postId: string) => {
  return useQuery({
    queryKey: [postId],
    queryFn: async () => await getPostAllComments(postId),
    enabled: !!postId, // Only run the query if postId is provided
  });
};

export const useUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { id: string; updatedComment: IUpdateComment }
  >({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({ id, updatedComment }) => {
      return toast.promise(updateComment(id, updatedComment), {
        loading: "Updating comment...",
        success: "Comment updated successfully!",
        error: "Error when updating comment.",
      });
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({ id }) => {
      return toast.promise(deleteComment(id), {
        loading: "Deleting comment...",
        success: "Comment deleted successfully!",
        error: "Error when deleting comment.",
      });
    },
  });
};
