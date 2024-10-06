"use client";
import Link from "next/link";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { useUserSignup } from "@/src/hooks/auth.hook";
import { useEffect, useState } from "react";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

const SignupPage = () => {
  const [seePassowrd, setSeePassword] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserSignup, isLoading, isSuccess } = useUserSignup();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl =
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png";

    if (data?.image) {
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

        imageUrl = response.data.secure_url;
      } catch (error: any) {
        console.error(error.message);
      }
    }

    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        profilePhoto: imageUrl,
      };

      handleUserSignup(userData);
      userLoading(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 bg-white h-screen">
      <div className="order-2 hidden xs:flex justify-center items-center w-full bg-[#2E603C] p-5 md:p-10">
        <h1 className="text-white font-vietnam-bold text-[6.27vw]">
          Pawsitive
        </h1>
      </div>
      <div className="order-1 bg-white h-full text-[#2E603C] text-xl font-satoshi flex justify-center items-center px-3 py-5 md:px-10 md:py-9">
        <div className="w-full sm:w-2/3 md:w-1/2 max-w-lg space-y-4">
          <p className="font-vietnam-bold">Sign up with</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div>
                <input
                  type="text"
                  placeholder={"Name"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.name as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={"Email"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide A Valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
              <div className="relative">
                <input
                  type={seePassowrd ? "text" : "password"}
                  placeholder={"Password"}
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6]"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(), setSeePassword(!seePassowrd);
                  }}
                  className="absolute right-5 top-[14px]"
                >
                  {seePassowrd ? (
                    <RiEyeCloseFill className="text-gray-500" />
                  ) : (
                    <RiEyeFill className="text-gray-500" />
                  )}
                </button>
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-[red]">
                      {(errors.password as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-accent w-full text-white text-base md:text-xl normal-case"
              value={"Signup"}
            />
          </form>
          <div className="flex gap-2 justify-center text-sm lg:text-lg">
            <p>Already have an account?</p>
            <Link
              className="decoration-transparent text-[#2E603C] font-semibold"
              href="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
