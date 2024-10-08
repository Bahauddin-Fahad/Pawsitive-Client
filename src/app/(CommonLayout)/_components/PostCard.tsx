/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { IComment } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import parse from "html-react-parser";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostAllComments,
  useUpdateComment,
} from "@/src/hooks/comment.hook";

import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";
import {
  useAddDownvotePost,
  useAddUpvotePost,
  useDeletePost,
  useRemoveDownvotePost,
  useRemoveUpvotePost,
} from "@/src/hooks/post.hook";
import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import UpdatePostModal from "@/src/components/modals/UpdatePostModal";
import { DeletePostModal } from "@/src/components/modals/DeletePostModal";
import { DeleteCommentModal } from "@/src/components/modals/DeleteCommentModal";
import { RiEyeFill, RiUserAddLine, RiUserUnfollowLine } from "react-icons/ri";
import { LuCrown, LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
  MdOutlineMessage,
} from "react-icons/md";
import { IoSend } from "react-icons/io5";

interface ITravelPostCardProps {
  singlePost: any;
  refetch?: () => void;
}

const PostCard = ({ singlePost, refetch }: ITravelPostCardProps) => {
  const {
    title,
    category,
    description,
    image,
    postAuthor,
    planType,
    upvote,
    downvote,
    createdAt,
    _id,
  } = singlePost;

  const { user } = useUser();
  const [comment, setComment] = useState<string>("");
  const { mutate: handleCreateComment } = useCreateComment();
  const { mutate: handleCommentUpdate } = useUpdateComment();
  const { mutate: handleCommentDelete } = useDeleteComment();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnfollowUser } = useUnfollowUser();
  const { mutate: handleAddUpvotePost } = useAddUpvotePost();
  const { mutate: handleRemoveUpvotePost } = useRemoveUpvotePost();
  const { mutate: handleAddDownvotePost } = useAddDownvotePost();
  const { mutate: handleRemoveDownvotePost } = useRemoveDownvotePost();

  const { mutate: handlePostDelete } = useDeletePost();
  const { data: allComments } = useGetPostAllComments(_id);

  const [isEditing, setIsEditing] = useState<string | null>("");
  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const router = useRouter();
  const params = new URLSearchParams();
  params.set("id", _id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEdit = (id: string, text: string) => {
    setIsEditing(id);
    setEditedComments((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  // Handle input change
  const handleEditCommentChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedComments((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleCommentSubmit = () => {
    setComment("");

    const commentData: IComment = {
      text: comment,
      user: user?._id as string,
      post: _id,
      email: user?.email as string,
    };

    try {
      handleCreateComment(commentData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleUpdateComment = (commentId: string) => {
    const updatedComment = editedComments[commentId];

    const newComment = {
      text: updatedComment,
    };

    try {
      handleCommentUpdate({ id: commentId, updatedComment: newComment });
      setIsEditing(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = () => {
    if (commentIdToDelete) {
      handleCommentDelete({ id: commentIdToDelete });
    }
  };

  const handleAddFollow = (id: string, name: string) => {
    handleFollowUser({ id, name });
  };

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
  };

  const handleAddUpvote = (id: string) => {
    handleAddUpvotePost({ id });
  };

  const handleRemoveUpvote = (id: string) => {
    handleRemoveUpvotePost({ id });
  };

  const handleAddDownvote = (id: string) => {
    handleAddDownvotePost({ id });
  };

  const handleRemoveDownvote = (id: string) => {
    handleRemoveDownvotePost({ id });
  };

  const handleDeletePost = async () => {
    handlePostDelete({ id: _id });
    refetch?.();
  };

  return (
    <div className="my-5">
      <article className="relative mb-4 break-inside p-4 md:p-6 rounded-xl bg-custom flex flex-col bg-clip-border md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto border border-secondary">
        {postAuthor._id === user?._id && (
          <div className="mb-5 cursor-pointer w-20">
            <Dropdown closeOnSelect={true}>
              <DropdownTrigger className="absolute top-3 right-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8c8c91"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
                {/* <HiDotsHorizontal /> */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="view"
                  // onClick={() =>
                  //   handleNavigation(`/postDetails?${params.toString()}`)
                  // }
                >
                  <span className="flex gap-2 items-center text-primary">
                    <RiEyeFill />
                    <span>View Post</span>
                  </span>
                </DropdownItem>
                <DropdownItem key="edit">
                  {" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenEditModal(true);
                    }}
                    className="flex gap-2 items-center text-primary"
                  >
                    <LuPencil />
                    <span>Edit Post</span>
                  </span>
                </DropdownItem>
                <DropdownItem key="delete">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDeleteModal(true);
                    }}
                    className="flex gap-2 items-center text-error hover:text-white"
                  >
                    <FaRegTrashAlt />
                    <span>Delete Post</span>
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <a className="inline-block mr-4">
              <img
                className="rounded-full max-w-none w-12 h-12 object-cover"
                src={postAuthor?.profilePhoto}
                alt=""
              />
            </a>
            <div className="flex flex-col">
              <Link href={`/postDetails?id=${_id}`}>
                <div>
                  <a className="inline-block text-lg font-bold">
                    {postAuthor?.name}
                  </a>
                </div>
              </Link>
              <div className="text-secondary">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            {postAuthor?._id !== user?._id && (
              <div className="ml-3 md:ml-4">
                {postAuthor?.followers?.includes(user?._id) ? (
                  <span
                    onClick={() =>
                      handleRemoveFollow(postAuthor?._id, postAuthor?.name)
                    }
                    className="rounded-full bg-secondary px-3 py-1 text-black text-sm font-semibold flex gap-2 items-center cursor-pointer hover:bg-secondary"
                  >
                    <span>
                      <RiUserUnfollowLine />
                    </span>
                    <span className="md:block">Unfollow</span>
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      handleAddFollow(postAuthor?._id, postAuthor?.name)
                    }
                    className="rounded-full bg-primary px-3 py-1 text-black text-sm font-semibold flex gap-2 items-center cursor-pointer hover:bg-secondary"
                  >
                    <span>
                      <RiUserAddLine />
                    </span>
                    <span className="md:block">Follow</span>
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mt-2 mb-6 md:mb-0 md:mt-0">
            <div className="rounded-full border border-primary px-3 py-2 text-white font-semibold hidden md:inline-flex justify-center mb-2 gap-1 min-w-16">
              <div className="flex items-center gap-2">
                {planType === "PREMIUM" && (
                  <span>
                    <LuCrown className="size-5 text-primary" />
                  </span>
                )}
                <span className="text-center">{category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* category part for small device */}
        <div className="mt-2 mb-6 md:mb-0 md:mt-0">
          <span className="rounded-full border border-primary px-3 py-2 text-primary font-semibold md:hidden mb-2">
            {category}
          </span>
        </div>

        {/* title part */}
        <h2 className="text-xl md:text-3xl font-extrabold">{title}</h2>

        {/* image part */}
        <div className="py-4">
          <div className="flex justify-between gap-1">
            <a className="flex w-full">
              <div className="overflow-hidden rounded-br-lg w-full h-[450px]">
                <img
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-md"
                  src={image}
                  alt="Description"
                />
              </div>
            </a>
          </div>
        </div>

        {/* description */}
        <div className="">{parse(description)}</div>

        {/* upvote,downvote & comment count */}
        <div className="py-4 flex gap-5">
          <div className="inline-flex items-center">
            {upvote?.includes(user?._id) ? (
              <span
                onClick={() => handleRemoveUpvote(_id as string)}
                className="mr-2 cursor-pointer"
              >
                <MdThumbUp className="size-6 text-primary" />
              </span>
            ) : (
              <span
                onClick={() => handleAddUpvote(_id as string)}
                className="mr-2 cursor-pointer"
              >
                <MdOutlineThumbUp className="size-6 text-primary" />
              </span>
            )}
            <span className="text-lg font-bold">{upvote?.length || 0}</span>
          </div>
          <div className="inline-flex items-center">
            {downvote?.includes(user?._id) ? (
              <span
                onClick={() => handleRemoveDownvote(_id)}
                className="mr-2 cursor-pointer"
              >
                <MdThumbDown className="size-6 text-primary" />
              </span>
            ) : (
              <span
                onClick={() => handleAddDownvote(_id)}
                className="mr-2 cursor-pointer"
              >
                <MdOutlineThumbDown className="size-6 text-primary" />
              </span>
            )}
            <span className="text-lg font-bold">{downvote?.length || 0}</span>
          </div>
          <div className="inline-flex items-center">
            <span className="mr-2">
              <MdOutlineMessage className="size-6 text-primary" />
            </span>
            <span className="text-lg font-bold">
              {allComments?.data?.result?.length || 0}
            </span>
          </div>
        </div>

        {/* Write comment part */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Write a comment"
            variant="bordered"
            size="lg"
            className="border-primary focus:ring-primary"
            value={comment}
            onChange={handleInputChange}
            endContent={
              <IoSend
                onClick={handleCommentSubmit}
                className="text-primary size-6 cursor-pointer"
              />
            }
          />
        </div>

        {/* Comment Section */}
        <div>
          {allComments?.data?.result?.length > 0 && (
            <div className="pt-6">
              {allComments.data.result.map((comment: any) => {
                return (
                  <div key={comment._id} className="pb-4">
                    <div className="flex ">
                      <a className="mr-4">
                        <img
                          className="rounded-full max-w-none w-12 h-12 object-cover"
                          src={comment.user?.profilePhoto}
                          alt={comment.user?.name}
                        />
                      </a>
                      <div className="flex flex-col w-full">
                        <div className="w-full">
                          {/* increase the width of this div */}
                          <div className="w-full">
                            <a className="inline-block font-bold mr-2">
                              {comment.user?.name}
                            </a>
                            <span className="text-xs md:text-sm text-secondary">
                              {new Date(comment.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </span>
                          </div>
                          <div>
                            {comment?.user?._id === user?._id &&
                            comment._id === isEditing ? (
                              <div className="flex gap-3">
                                <div className="relative w-full">
                                  <Input
                                    type="text"
                                    placeholder="Write a comment"
                                    variant="bordered"
                                    size="md"
                                    className="border-primary focus:ring-primary"
                                    value={
                                      editedComments[comment._id] !== undefined
                                        ? editedComments[comment._id]
                                        : comment.text
                                    }
                                    onChange={(e) =>
                                      handleEditCommentChange(comment._id, e)
                                    }
                                    endContent={
                                      <IoSend
                                        onClick={() =>
                                          handleUpdateComment(comment._id)
                                        }
                                        className="text-primary size-6 cursor-pointer"
                                      />
                                    }
                                  />
                                </div>
                                <button
                                  onClick={handleCancel}
                                  className="rounded-md border border-red-600 py-[3px] px-2 text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <p>{comment.text}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          {comment?.user?._id === user?._id && (
                            <>
                              {!isEditing && (
                                <div className="hidden md:flex gap-3 mr-2">
                                  <p
                                    onClick={() =>
                                      handleEdit(comment._id, comment.text)
                                    }
                                    className="text-sm text-secondary hover:underline cursor-pointer"
                                  >
                                    Edit
                                  </p>
                                  <p
                                    onClick={() => {
                                      setCommentIdToDelete(comment._id);
                                      setOpenModal(true);
                                    }}
                                    className="text-sm text-secondary hover:underline cursor-pointer"
                                  >
                                    Delete
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>

      {openEditModal && (
        <UpdatePostModal
          singlePost={singlePost}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          refetch={refetch}
        />
      )}

      {openDeleteModal && (
        <DeletePostModal
          handleDeletePost={handleDeletePost}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {commentIdToDelete && (
        <DeleteCommentModal
          handleDeleteComment={handleDeleteComment}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default PostCard;
