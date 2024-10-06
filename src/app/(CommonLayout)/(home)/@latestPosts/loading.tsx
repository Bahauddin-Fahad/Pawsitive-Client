import LoadingCardWithoutComment from "../../_components/LoadingCardWithoutComment";
import CreatePost from "../_components/CreatePost/CreatePost";

const LatestPostLoading = () => {
  return (
    <div>
      <CreatePost />
      <LoadingCardWithoutComment />
    </div>
  );
};

export default LatestPostLoading;
