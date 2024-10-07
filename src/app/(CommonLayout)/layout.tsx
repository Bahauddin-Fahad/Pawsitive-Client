import Navbar from "@/src/components/modules/shared/Navbar/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="pb-10 px-5">{children}</div>
    </div>
  );
}
