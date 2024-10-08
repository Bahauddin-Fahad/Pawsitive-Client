"use client";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import axios from "axios";
import { useCreatePost } from "@/src/hooks/post.hook";
import { Checkbox } from "@nextui-org/checkbox";
import envConfig from "@/src/config/envConfig";
import toast from "react-hot-toast";
import { useUser } from "@/src/context/user.provider";
import AuthenticationModal from "./AuthenticationModal";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const postCategory = [
  { key: "Tip", label: "Tip" },
  { key: "Story", label: "Story" },
];

export default function CreatePostModal({ refetch }: { refetch: any }) {
  const [openModal, setOpenModal] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [content, setContent] = useState("");
  const { handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;

  const [isSelected, setIsSelected] = useState(false);
  const { user, isLoading } = useUser();
  const [postImgFile, setPostImgFile] = useState<File | null>(null);
  const [postImgTempURL, setPostImgTempURL] = useState<string | null>(null);
  const { mutate: handlePostCreation } = useCreatePost();

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
    if (!postImgFile) return;
    const imgTempURL = URL.createObjectURL(postImgFile);
    setPostImgTempURL(imgTempURL);
    return () => {
      return URL.revokeObjectURL(imgTempURL);
    };
  }, [postImgFile]);

  const handleCreatePost = async (data: any) => {
    if (!data.title && !data.category && !data.description && !data.image) {
      setOpenModal(false);
      return;
    }
    const cloudName = envConfig.cloudinary_name as string;
    const uploadPreset = envConfig.cloudinary_upload_preset as string;

    toast.loading("Creating Post...");

    try {
      const formdata = new FormData();
      if (postImgFile) {
        formdata.append("file", postImgFile);
        formdata.append("upload_preset", uploadPreset);
      } else {
        console.error("Profile image file is not set.");
      }

      const imageURL = await axios
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

      const postData = {
        title: data.title,
        category: data.category,
        description: data.description,
        image: imageURL,
        planType: isSelected ? "PREMIUM" : "BASIC",
      };

      toast.dismiss();

      handlePostCreation(postData);
      toast.success("Post created successfully!");
      setOpenModal(false);
      refetch();
      reset();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto w-fit">
      <div
        className="flex items-center justify-center rounded-lg p-2 hover:shadow-md transition-shadow duration-200 cursor-pointer "
        onClick={() => (user ? setOpenModal(true) : setOpenAuthModal(true))}
      >
        {user && (
          <div className="flex items-start">
            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-custom mr-2" />
            ) : (
              <img
                src={user?.profilePhoto}
                alt="User Avatar"
                className="size-14 rounded-full mr-2 object-cover"
              />
            )}
          </div>
        )}
        <textarea
          placeholder={`Want to Tell us your story or share a tip? ${user ? user?.name : ""}`}
          className={`flex-grow border border-secondary resize-none text-sm md:text-xl h-14 rounded-full pl-2 md:pl-5 py-4 md:py-3 ${
            user
              ? "w-[330px] md:w-[580px] lg:w-[770px] xl:w-[930px]"
              : "w-[355px] md:w-[640px] lg:w-[830px] xl:w-[990px]"
          }`}
          readOnly
        />
      </div>

      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-11/12 mx-auto md:max-w-3xl rounded-lg bg-custom p-6 drop-shadow-lg overflow-y-auto h-auto max-h-[100vh] ${
            openModal
              ? "opacity-1 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          <RxCross2
            onClick={() => setOpenModal(false)}
            className="absolute right-4 top-5 w-8 cursor-pointer text-white"
          />

          <h1 className="mb-2 text-3xl font-semibold">Create Pet Post</h1>
          <div>
            <form
              onSubmit={handleSubmit(handleCreatePost)}
              className="space-y-3"
            >
              {user?.planType === "PREMIUM" && (
                <div className="mt-7">
                  <Checkbox
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  >
                    Mark as Premium
                  </Checkbox>
                </div>
              )}
              <div>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Please provide post title" }}
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
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field }) => (
                    <Select {...field} label="Select a category">
                      {postCategory.map((category) => (
                        <SelectItem key={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500">
                    {errors.category.message as ReactNode}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Please provide post description" }}
                  render={({ field }) => (
                    <div className="w-full space-y-3">
                      <label className="font-semibold">Post Description</label>
                      <ReactQuill
                        {...field}
                        value={content}
                        onChange={(value) => {
                          setContent(value);
                          field.onChange(value);
                        }}
                        modules={modules}
                        // className="h-[110px]"
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
                    // onClick={() => setOpenModal(false)}
                    className="rounded-md bg-emerald-600 w-full py-[6px] text-white hover:bg-emerald-700"
                  >
                    Submit
                  </button>
                </div>

                <div className="flex-1">
                  <button
                    onClick={() => {
                      reset();
                      setOpenModal(false);
                    }}
                    className="rounded-md border border-red-600 w-full py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {openAuthModal && (
        <AuthenticationModal
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
        />
      )}
    </div>
  );
}
