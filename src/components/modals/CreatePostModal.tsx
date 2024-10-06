"use client";
import { ReactNode, useState } from "react";
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
import { RxCross2 } from "react-icons/rx";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const postCategory = [
  { key: "Tips", label: "Tips" },
  { key: "Story", label: "Story" },
];

export default function CreatePostModal() {
  const [openModal, setOpenModal] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset, formState, control, setValue } =
    useForm();
  const { errors } = formState;
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { user, isLoading } = useUser();

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("image", file); // Set the file value in the form state
    setFileName(file ? file.name : null);
  };

  const clearFileSelection = () => {
    setFileName("");
    setValue("image", null);
  };

  const handleCreatePost = async (data: any) => {
    if (!data.title && !data.category && !data.description && !data.image) {
      setOpenModal(false);
      return;
    }

    toast.loading("Creating Post...");

    const formData = new FormData();
    formData.append("file", data.image);
    formData.append(
      "upload_preset",
      envConfig.cloudinary_upload_preset as string
    );

    try {
      const response = await axios.post(
        envConfig.cloudinary_url as string,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;

      const postData = {
        title: data.title,
        category: data.category,
        description: data.description,
        image: imageUrl,
        status: isSelected ? "PREMIUM" : "BASIC",
      };
      console.log(postData);

      toast.dismiss();

      handlePostCreation(postData);
      toast.success("Post created successfully!");
      setOpenModal(false);
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
          placeholder={`Want to Tell us your story or share a tip? ${user?.name}`}
          className={`flex-grow border border-primary resize-none text-xl h-14 rounded-full pl-5 py-3 ${
            user
              ? "w-[330px] md:w-[580px] lg:w-[770px] xl:w-[930px]"
              : "w-[355px] md:w-[640px] lg:w-[830px] xl:w-[990px]"
          }`}
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
          className={`absolute w-11/12 mx-auto md:max-w-3xl rounded-lg bg-custom p-6 drop-shadow-lg overflow-y-auto h-fit max-h-[95vh] ${
            openModal
              ? "opacity-1 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          <RxCross2
            onClick={() => setOpenModal(false)}
            className="absolute right-4 top-5 w-8 cursor-pointer text-white"
          />

          <h1 className="mb-2 text-3xl font-semibold">Create Travel Post</h1>
          <div>
            <div className="mt-7">
              <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                Mark as Premium
              </Checkbox>
            </div>
            <form
              onSubmit={handleSubmit(handleCreatePost)}
              className="space-y-3"
            >
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

              <div className="flex flex-col">
                <div className="mt-9">
                  <label
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 text-default-800 shadow-sm transition-all duration-100 hover:border-primary-600"
                    htmlFor={"image"}
                  >
                    {"Upload Post Image"}
                  </label>
                </div>
                <input
                  accept="image/*"
                  className="hidden"
                  id={"image"}
                  type="file"
                  {...register("image")}
                  onChange={handleFileChange}
                />

                {fileName && (
                  <div className="mt-2 flex items-center text-sm text-gray-600 justify-between">
                    <span
                      className="font-medium mr-2 truncate w-60"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Selected file: {fileName}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-medium"
                      onClick={clearFileSelection}
                    >
                      Clear
                    </button>
                  </div>
                )}

                {!fileName && errors.image && (
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

      {openAuthModal && (
        <AuthenticationModal
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
        />
      )}
    </div>
  );
}
