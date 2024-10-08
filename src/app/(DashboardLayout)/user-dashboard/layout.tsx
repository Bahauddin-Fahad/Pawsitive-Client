import type { Metadata } from "next";

import Sidebar from "@/src/app/(DashboardLayout)/_components/Sidebar";
import { MdOutlinePets } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { IoMdBook } from "react-icons/io";

export const metadata: Metadata = {
  title: "User Dashboard",
  description:
    "Explore heartwarming stories, expert tips, and helpful guides for caring for your pets. Discover a community of pet lovers sharing their experiences, advice, and unique insights into keeping your furry friends happy and healthy.",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userLinks = [
    {
      label: "Posts",
      href: "/user-dashboard",
      icon: <IoMdBook className="size-5" />,
    },
    {
      label: "Followers",
      href: "/user-dashboard/followers",
      icon: <FiUser className="size-5" />,
    },
    {
      label: "Following",
      href: "/user-dashboard/followings",
      icon: <RiUserFollowLine className="size-5" />,
    },
    {
      label: "Nutrition List",
      href: "/user-dashboard/nutrition-list",
      icon: <MdOutlinePets className="size-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={userLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
