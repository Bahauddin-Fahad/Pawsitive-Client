import type { Metadata } from "next";
import { User, BookOpenText, BadgeDollarSign } from "lucide-react";
import Sidebar from "../_components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Explore heartwarming stories, expert tips, and helpful guides for caring for your pets. Discover a community of pet lovers sharing their experiences, advice, and unique insights into keeping your furry friends happy and healthy.",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminLinks = [
    {
      label: "Post Management",
      href: "/admin-dashboard",
      icon: <BookOpenText size={20} />,
    },
    {
      label: "User Management",
      href: "/admin-dashboard/users",
      icon: <User size={20} />,
    },

    {
      label: "Payment Management",
      href: "/admin-dashboard/payments",
      icon: <BadgeDollarSign size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={adminLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
