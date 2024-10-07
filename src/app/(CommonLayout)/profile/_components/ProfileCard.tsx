"use client";

import { ProfileEditModal } from "@/src/components/modals/ProfileEditModal";
import VerifyModal from "@/src/components/modals/VerifyModal";
import { IUser } from "@/src/types";
import { useState } from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { HiOutlineCheckBadge } from "react-icons/hi2";
export default function ProfileCard({ user }: { user: IUser }) {
  const {
    name,
    email,
    planType,
    profilePhoto,
    followers,
    following,
    totalUpvote,
    postCount,
  } = user;

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openVerifyProfileModal, setOpenVerifyProfileModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative sm:w-[350px]">
        <img
          className="h-full w-[95%] mx-auto lg:h-[400px] xl:h-[437px] md:w-full scale-105 transform rounded-lg bg-black/70 object-cover"
          src={profilePhoto}
          alt="user"
        />
      </div>
      <div className="w-full md:min-w-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-custom p-10 text-center shadow-md md:w-[400px]">
        <div className="space-y-1">
          <h2 className="text-center flex justify-center items-center text-2xl font-medium text-white lg:text-3xl">
            <span>{name}</span>
            <span>
              {planType === "PREMIUM" && (
                <span>
                  <LuBadgeCheck className="size-7 text-blue-700" />
                </span>
              )}
            </span>
          </h2>

          <p className="text-secondary">{email}</p>
          <div className="py-2">
            <span className="rounded-full border-2 border-primary px-3 py-1 text-xs font-semibold text-primary">
              {planType} PLAN
            </span>
          </div>
          {planType != "PREMIUM" && totalUpvote > 0 && (
            <div
              onClick={() => {
                setOpenVerifyProfileModal(true);
              }}
              className="flex gap-1 justify-center items-center cursor-pointer"
            >
              <span className="underline font-medium">GET VERIFIED</span>
              <span>
                <HiOutlineCheckBadge className="size-6 text-primary" />
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-secondary">Posts</p>
            <p className="text-2xl tracking-wider text-white lg:text-3xl">
              {postCount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-secondary">Following</p>
            <p className="text-2xl tracking-wider text-white lg:text-3xl">
              {following?.length || 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-secondary">Followers</p>
            <p className="text-2xl tracking-wider text-white lg:text-3xl">
              {followers?.length || 0}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setOpenEditProfileModal(true);
            }}
            className="rounded-full border-2 border-primary px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white  duration-300 font-semibold"
          >
            EDIT PROFILE
          </button>
        </div>

        {openEditProfileModal && (
          <ProfileEditModal
            user={user}
            openModal={openEditProfileModal}
            setOpenModal={setOpenEditProfileModal}
          />
        )}

        {openVerifyProfileModal && (
          <VerifyModal
            openModal={openVerifyProfileModal}
            setOpenModal={setOpenVerifyProfileModal}
          />
        )}
      </div>
    </div>
  );
}
