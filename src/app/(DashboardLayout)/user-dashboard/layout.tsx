import type { Metadata } from "next";
import {
  User,
  MessageSquareQuote,
  Contact,
  ContactRound,
  BookOpenText,
  UserPlus,
} from "lucide-react";
import Sidebar from "@/src/app/(DashboardLayout)/_components/Sidebar";

export const metadata: Metadata = {
  title: "User Dashboard",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
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
