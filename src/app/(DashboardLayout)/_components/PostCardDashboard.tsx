"use client";

import { DeletePostModal } from "@/src/components/modals/DeletePostModal";
import { useDeletePost } from "@/src/hooks/post.hook";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface IPostCardProps {
  singlePost: any;
  refetch: any;
}

const PostCardDashboard = ({ singlePost, refetch }: IPostCardProps) => {
  const { _id, title, image, postAuthor, createdAt } = singlePost;

  const params = new URLSearchParams();
  params.set("id", _id);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: handlePostDelete } = useDeletePost();

  const handleDeletePost = async () => {
    handlePostDelete({ id: _id });
    refetch();
  };

  return (
    <div>
      <Card className="py-4 relative">
        <CardHeader className="pb-0 pt-2 px-4">
          <div className="flex">
            <div className="flex gap-2 items-start">
              <Avatar
                src={postAuthor?.profilePhoto}
                size="sm"
                className="object-cover"
              />
              <div>
                <p className="text-tiny uppercase font-bold">
                  {postAuthor?.name}
                </p>
                <small className="text-default-500">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
            <div className="mb-5 cursor-pointer w-20">
              <Dropdown closeOnSelect={true}>
                <DropdownTrigger className="absolute top-3 right-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
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
          </div>
        </CardHeader>
        <h4 className="font-bold text-large flex-grow px-4">{title}</h4>
        <CardBody className="overflow-visible py-2 w-full">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src={image}
            width={320}
            height={165}
          />
        </CardBody>
      </Card>

      {openDeleteModal && (
        <DeletePostModal
          handleDeletePost={handleDeletePost}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default PostCardDashboard;
