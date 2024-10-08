"use client";

import { useGetAllPostsInDashboard } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import SectionTitle from "../../(CommonLayout)/_components/SectionTitle";
import LoadingCardDashboard from "../_components/LoadingCardDashboard";
import PostCardDashboard from "../_components/PostCardDashboard";

const AdminDashboardHome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const {
    data: AllPosts,
    refetch,
    isLoading: postLoading,
  } = useGetAllPostsInDashboard(`page=${currentPage}&limit=${dataPerPage}`);

  const totalPagesArray = Array.from(
    { length: AllPosts?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pb-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Post Content Management"
      />

      <div className="mt-8">
        <div>
          {AllPosts?.data?.length > 0 ? (
            postLoading ? (
              <LoadingCardDashboard />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {AllPosts?.data?.map((singlePost: IPost, index: number) => (
                  <div key={index}>
                    <PostCardDashboard
                      singlePost={singlePost}
                      refetch={refetch}
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="pt-14 lg:pt-24">
                <img
                  src="https://i.postimg.cc/MTdMr9TP/post.png"
                  className="w-52"
                  alt=""
                />
              </div>
              <p className="max-w-lg text-center text-3xl font-bold mt-6">
                No posts available.
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
