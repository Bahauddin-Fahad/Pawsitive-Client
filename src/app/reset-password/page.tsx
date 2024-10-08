"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/src/assets/logo.png";
import { Input } from "@nextui-org/input";
import { useState } from "react";

import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";
import { resetPassword } from "@/src/services/AuthServices";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")!;
  const resetToken = searchParams.get("token")!;
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    toast.loading("Resetting Password...");

    const userData = { email: email, newPassword: value };

    const response = await resetPassword(userData, resetToken);
    toast.dismiss();

    if (response?.success) {
      setLoading(false);
      setValue("");
      toast.success("Password reset successful!", {
        duration: 6000,
      });
      router.push("/login");
    }
  };

  return (
    <section className="bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-custom rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link href={"/"}>
              <Image
                className=""
                src={logo}
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <h2 className="mt-6 mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <Input
                value={email as string}
                type="email"
                placeholder="Enter your email..."
                variant="bordered"
                errorMessage="Please enter a valid email"
                size="lg"
                isDisabled
              />
            </div>
            <div>
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your new password"
                onValueChange={setValue}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <RiEyeCloseFill className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>

            <button
              type="submit"
              className="group relative z-10 h-11 w-full overflow-hidden bg-primary text-black rounded-full text-center font-semibold text-lg"
            >
              {loading ? (
                <ImSpinner6 className="animate-spin m-auto text-xl" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
