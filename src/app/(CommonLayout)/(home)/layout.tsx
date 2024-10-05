import { ReactNode } from "react";

const HomeLayout = ({
  children,
  latestPosts,
}: {
  children: ReactNode;
  latestPosts: ReactNode;
}) => {
  return (
    <>
      {children}
      {latestPosts}
    </>
  );
};

export default HomeLayout;
