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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const travelCategory = [
  { key: "Adventure", label: "Adventure" },
  { key: "Business Travel", label: "Business Travel" },
  { key: "Exploration", label: "Exploration" },
  { key: "Family Travel", label: "Family Travel" },
  { key: "Luxury Travel", label: "Luxury Travel" },
  { key: "Budget Travel", label: "Budget Travel" },
];

export default function CreatePostModal() {
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset, formState, control, setValue } =
    useForm();
  const { errors } = formState;
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(false);

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
    if (!data.title || !data.category || !data.description || !data.image)
      return;
    setOpenModal(false);

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

      handlePostCreation(postData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto w-fit">
      <textarea
        placeholder="Tell us your story or share a tip! 🌍"
        onClick={() => setOpenModal(true)}
        className="rounded-md border border-zinc-500 px-3 py-2 text-zinc-500 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 w-[350px] md:w-[600px] h-20 resize-none"
      />

      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-11/12 mx-auto md:max-w-3xl xl:max-w-4xl rounded-lg bg-white p-6 drop-shadow-lg overflow-y-auto h-fit max-h-[90vh] ${
            openModal
              ? "opacity-1 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          <svg
            onClick={() => setOpenModal(false)}
            className="absolute right-4 top-5 w-8 cursor-pointer fill-zinc-700"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
          </svg>
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
                      {travelCategory.map((category) => (
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
    </div>
  );
}
