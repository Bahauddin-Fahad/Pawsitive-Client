import { IUpdateUser } from "@/src/types";

import toast from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form";

import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { useUpdateUser } from "@/src/hooks/user.hook";
import PForm from "../form/PForm";
import PInput from "../form/PInput";
import PFileInput from "../form/PFileInput";

export const ProfileEditModal = ({ user, openModal, setOpenModal }: any) => {
  const { mutate: handleUpdateUser } = useUpdateUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const hasImage = !!data.image && data.image instanceof File;
    // const hasImage = !!data.image;
    const hasNameChanged = data.name !== user.name;
    const hasEmailChanged = data.email !== user.email;

    if (!hasImage && !hasNameChanged && !hasEmailChanged) {
      setOpenModal(false);
      return;
    }

    toast.loading("Updating Profile...");

    const cloudName = envConfig.cloudinary_name as string;
    const uploadPreset = envConfig.cloudinary_upload_preset as string;
    let imageURL = user?.profilePhoto;

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append("upload_preset", uploadPreset);

      try {
        imageURL = await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
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
      const userData: IUpdateUser = {
        name: data.name ? data.name : user.name,
        email: data.email ? data.email : user.email,
        profilePhoto: imageURL,
      };

      toast.dismiss();

      handleUpdateUser({ userData, id: user._id });
      toast.success("Profile updated successfully!");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute w-96 mx-auto rounded-lg bg-custom p-6 text-center drop-shadow-2xl  opacity-1 translate-y-0 duration-300"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-center text-3xl font-bold">Edit Profile</h1>

              <div className="w-full">
                <PForm
                  defaultValues={{
                    name: user?.name,
                    email: user.email,
                  }}
                  onSubmit={onSubmit}
                >
                  <div className="py-3">
                    <PInput name="name" label="Full Name" type="text" />
                  </div>
                  <div className="py-3">
                    <PInput name="email" label="Email" type="email" />
                  </div>

                  <div className="py-3">
                    <PFileInput name="image" label="Upload Image" />{" "}
                  </div>

                  <div className="flex gap-5 justify-center items-center">
                    <button
                      type="submit"
                      className="rounded-md bg-green-600 px-6 py-2 text-sm text-white hover:bg-green-700"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="rounded-md border border-red-600 px-6 py-2 text-sm text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </PForm>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
