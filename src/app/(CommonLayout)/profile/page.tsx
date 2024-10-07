"use client";

import { useUser } from "@/src/context/user.provider";

import ProfileCard from "./_components/ProfileCard";
import ProfileLoadingCard from "./_components/ProfileLoadingCard";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="my-8 xl:my-10">
      {user ? <ProfileCard user={user} /> : <ProfileLoadingCard />}
    </div>
  );
};

export default Profile;
