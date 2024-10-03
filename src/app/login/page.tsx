"use client";
import Link from "next/link";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

export type TLogin = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [seePassowrd, setSeePassword] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isLoading, isSuccess } = useUserLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
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
      <div className="hidden xs:flex justify-center items-center w-full bg-[#2E603C] p-5 md:p-10">
        <h1 className="text-white font-vietnam-bold text-[6.27vw]">
          Pawsitive
        </h1>
      </div>
      <div className="bg-white h-full text-[#2E603C] font-satoshi text-xl flex justify-center items-center px-3 py-5 md:px-10 md:py-9">
        <div className="w-full sm:w-2/3 md:w-1/2 max-w-lg space-y-4">
          <p className="font-vietnam-bold">Sign in with</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
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
                  className="input input-bordered w-full max-w-lg bg-[#F6F6F6] "
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
              value={"Login"}
            />
          </form>
          <div className="flex gap-2 justify-center text-sm lg:text-lg">
            <p>{"Don't have an account?"}</p>
            <Link className="text-[#2E603C] font-semibold" href="/signup">
              {"Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
