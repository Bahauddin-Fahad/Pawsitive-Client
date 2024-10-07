"use client";

import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import "react-quill/dist/quill.snow.css";
import { useUser } from "@/src/context/user.provider";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import toast from "react-hot-toast";
import { IPost } from "@/src/types";
import axios from "axios";
import envConfig from "@/src/config/envConfig";
import { useUpdatePost } from "@/src/hooks/post.hook";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const postCategory = [
  { key: "Tip", label: "Tip" },
  { key: "Story", label: "Story" },
];

interface CreatePostModalBodyProps {
  singlePost: IPost;
  setOpenEditModal: (value: boolean) => void;
  openEditModal: any;
  refetch?: () => void;
}

const UpdatePostModal = ({
  singlePost,
  openEditModal,
  setOpenEditModal,
  refetch,
}: CreatePostModalBodyProps) => {
  const { mutate: handlePostUpdate } = useUpdatePost();
  const { handleSubmit, reset, formState, control, setValue } = useForm();
  const { errors } = formState;
  const [isSelected, setIsSelected] = useState(
    singlePost?.planType === "PREMIUM" ? true : false
  );
  const [postImgFile, setPostImgFile] = useState<File | null>(null);
  const [postImgTempURL, setPostImgTempURL] = useState<string | null>(null);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    singlePost?.category || "Choose One"
  );

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
      ],
    },
  };

  useEffect(() => {
    setSelectedCategory(singlePost?.category || "Select a Category");
    setValue("category", singlePost?.category);
  }, [singlePost?.category, setValue]);

  useEffect(() => {
    if (!postImgFile) return;
    const imgTempURL = URL.createObjectURL(postImgFile);
    setPostImgTempURL(imgTempURL);
    return () => {
      return URL.revokeObjectURL(imgTempURL);
    };
  }, [postImgFile]);

  const handleUpdatePost = async (data: any) => {
    const hasImage = !!data.image;
    const hasTitleChanged = data.title !== singlePost?.title;
    const hasDescriptionChanged = data.description !== singlePost?.description;
    const hasCategoryChanged = data.category !== singlePost?.category;
    const hasPostStatusChanged =
      (singlePost?.planType === "PREMIUM") !== isSelected;

    if (
      !hasImage &&
      !hasTitleChanged &&
      !hasCategoryChanged &&
      !hasDescriptionChanged &&
      !hasPostStatusChanged
    ) {
      setOpenEditModal(false);
      return;
    }

    toast.loading("Updating Post...");

    const cloudName = envConfig.cloudinary_name as string;
    const uploadPreset = envConfig.cloudinary_upload_preset as string;
    let imageURL = singlePost?.image;
    if (hasImage) {
      const formdata = new FormData();
      if (postImgFile) {
        formdata.append("file", postImgFile);
        formdata.append("upload_preset", uploadPreset);
      } else {
        console.error("Post image file is not set.");
      }

      try {
        imageURL = await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((data) => data.data.secure_url);
      } catch (error: any) {
        console.error(error.message);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      const postData: Partial<IPost> = {
        title: hasTitleChanged ? data.title : singlePost?.title,
        category: hasCategoryChanged ? data.category : singlePost?.category,
        description: hasDescriptionChanged
          ? data.description
          : singlePost?.description,
        image: imageURL,
        planType: isSelected ? "PREMIUM" : "BASIC",
      };

      toast.dismiss();

      handlePostUpdate({ postData, id: singlePost?._id as string });
      setOpenEditModal(false);
      toast.success("Post updated successfully!");
      refetch?.();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div
      onClick={() => setOpenEditModal(false)}
      className={`fixed z-[100] w-screen ${
        openEditModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute w-11/12 mx-auto md:max-w-3xl rounded-lg bg-white p-6 drop-shadow-lg overflow-y-auto h-fit max-h-[90vh] ${
          openEditModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <svg
          onClick={() => setOpenEditModal(false)}
          className="absolute right-4 top-5 w-8 cursor-pointer fill-zinc-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
        </svg>
        <h1 className="mb-2 text-3xl font-semibold">Update Pet Post</h1>
        <div>
          <form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-3">
            {user?.planType === "PREMIUM" && (
              <div className="mt-7">
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                  Mark as Premium
                </Checkbox>
              </div>
            )}

            <div>
              <Controller
                name="title"
                control={control}
                defaultValue={singlePost?.title}
                render={({ field }) => (
                  <Input {...field} label="Post Title" variant="underlined" />
                )}
              />
              {errors.title && (
                <p className="text-red-500">
                  {errors.title.message as ReactNode}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold">Select a Category</label>
              <div className="relative w-full">
                {" "}
                {/* Changed to relative positioning */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full items-center justify-between rounded-xl bg-white px-6 py-2 border cursor-pointer"
                >
                  <h1 className="font-medium text-gray-600">
                    {selectedCategory}
                  </h1>
                  <svg
                    className={`${
                      isOpen ? "-rotate-180" : "rotate-0"
                    } duration-300`}
                    width={25}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div
                  className={`${
                    isOpen
                      ? "absolute left-0 right-0 z-10 mt-1 rounded-xl border bg-white shadow-lg transition-opacity duration-300"
                      : "hidden"
                  }`}
                >
                  {postCategory.map((cat) => (
                    <div
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.label);
                        setIsOpen(false);
                        setValue("category", cat.key);
                      }}
                      className="px-6 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-500">
                    {errors.category.message as ReactNode}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Controller
                name="description"
                control={control}
                defaultValue={singlePost?.description} // Pass the description (HTML)
                render={({ field }) => (
                  <div className="w-full space-y-3">
                    <label className="font-semibold">Post Description</label>
                    <ReactQuill
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      modules={modules}
                      className="h-[110px]"
                    />
                  </div>
                )}
              />
              {errors.description && (
                <p className="text-red-500 mt-12">
                  {errors.description.message as ReactNode}
                </p>
              )}
            </div>

            <div className="mt-9">
              {postImgTempURL ? (
                <div className="relative w-fit">
                  <img
                    src={postImgTempURL}
                    alt=" "
                    className="w-[100px] h-[75px] rounded-[10px] object-cover"
                  />
                  <RxCrossCircled
                    onClick={() => setPostImgTempURL(null)}
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 font-bold w-6 h-6"
                  />
                </div>
              ) : (
                <label className="cursor-pointer bg-secondary w-[100px] h-[75px] rounded-[10px] flex flex-col justify-center items-center gap-1">
                  <MdOutlineAddPhotoAlternate className="text-black h-7 w-7" />
                  <p className="text-xs text-black">Add Photo</p>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setPostImgFile(e.target.files?.[0] as File);
                    }}
                  />
                </label>
              )}
              {!postImgFile && errors.image && (
                <p className="mt-1 text-sm text-red-600 text-center">
                  {errors.image.message as ReactNode}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 w-full py-[6px] text-white hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>

              <div className="flex-1">
                <button
                  onClick={() => {
                    reset();
                    setOpenEditModal(false);
                  }}
                  className="rounded-md border border-rose-600 w-full py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostModal;
