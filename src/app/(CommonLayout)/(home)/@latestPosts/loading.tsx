import LoadingCardWithoutComment from "@/src/components/ui/section/LoadingCardWithoutComment";
import CreatePost from "../_homeSections/CreatePost/CreatePost";

const LatestPostLoading = () => {
  return (
    <div>
      <CreatePost />
      <LoadingCardWithoutComment />
    </div>
  );
};

export default LatestPostLoading;
