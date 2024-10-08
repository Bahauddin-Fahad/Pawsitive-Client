import LoadingCard from "../../_components/LoadingCard";
import CreatePost from "../_components/CreatePost/CreatePost";

const LatestPostLoading = () => {
  return (
    <div>
      <CreatePost />
      <LoadingCard />
    </div>
  );
};

export default LatestPostLoading;
