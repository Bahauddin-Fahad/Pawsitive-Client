import type { Metadata } from "next";
import { User, BookOpenText, UserPlus } from "lucide-react";
import Sidebar from "@/src/app/(DashboardLayout)/_components/Sidebar";

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
      icon: <BookOpenText size={20} />,
    },
    {
      label: "Followers",
      href: "/user-dashboard/followers",
      icon: <User size={20} />,
    },
    {
      label: "Following",
      href: "/user-dashboard/followings",
      icon: <UserPlus size={20} />,
    },
  ];

  // const commonLinks = [
  //   {
  //     label: "NewsFeed",
  //     href: "/",
  //     icon: <MessageSquareQuote size={20} />,
  //   },
  //   {
  //     label: "About",
  //     href: "/about",
  //     icon: <ContactRound size={20} />,
  //   },
  //   {
  //     label: "Contact",
  //     href: "/contact",
  //     icon: <Contact size={20} />,
  //   },
  // ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={userLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
