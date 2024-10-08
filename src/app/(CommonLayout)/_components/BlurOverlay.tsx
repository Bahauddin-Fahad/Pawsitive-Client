"use client";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { MdWorkspacePremium } from "react-icons/md";

const BlurOverlay = () => {
  const { user } = useUser();

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center rounded-xl md:w-11/12 lg:w-10/12 xl:w-full mx-auto">
      {user ? (
        <Link href={"/profile"}>
          <Button color="primary" className="text-white">
            <span>
              <MdWorkspacePremium className="text-2xl" />
            </span>
            <span>Go for Premium</span>
          </Button>
        </Link>
      ) : (
        <Link href={"/login"}>
          <Button
            color="primary"
            className="text-white flex items-center gap-2"
          >
            <span>
              <KeyRound />
            </span>
            <span>Login and Read</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default BlurOverlay;
