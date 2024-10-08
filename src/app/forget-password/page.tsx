"use client";
import logo from "@/src/assets/logo.png";
import { forgetPassword } from "@/src/services/AuthServices";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner6 } from "react-icons/im";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    toast.loading("Loading...");

    const userData = { email: value };

    const response = await forgetPassword(userData);
    toast.dismiss();

    if (response?.success) {
      setLoading(false);
      setValue("");
      return toast.success("Password reset URL has been sent to your email", {
        duration: 6000,
      });
    }
  };

  return (
    <section className="bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-custom rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link
              href={"/"}
            
            >
              <Image
                className=""
                src={logo}
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>

          <h1 className="mt-6 mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-secondary">
            Don&apos;t fret! Just type in your email and we will send you a URL
            to reset your password!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <Input
                value={value}
                type="email"
                placeholder="Enter your email..."
                variant="bordered"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage="Please enter a valid email"
                onValueChange={setValue}
                size="lg"
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

export default ForgotPassword;
