import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { RiUserAddLine, RiUserUnfollowLine } from "react-icons/ri";

const FollowersCard = ({
  singleUser,
  allFollowings,
}: {
  singleUser: IUser;
  allFollowings: any[];
}) => {
  const { _id, name, profilePhoto, postCount, followers, following } =
    singleUser;

  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnfollowUser } = useUnfollowUser();

  const handleAddFollow = (id: string, name: string) => {
    handleFollowUser({ id, name });
  };

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
  };

  return (
    <div className="relative xl:w-[320px] mx-auto mt-24 break-words bg-custom mb-6 shadow-lg rounded-xl border">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <Avatar
                src={profilePhoto}
                className="shadow-xl align-middle border-none w-[150px] h-[150px] text-large absolute -top-16 -right-[80px] object-cover"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-white">
                  {postCount}
                </span>
                <span className="text-sm text-secondary">Posts</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-white">
                  {followers.length || 0}
                </span>
                <span className="text-sm text-secondary">Followers</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-white">
                  {following.length || 0}
                </span>
                <span className="text-sm text-secondary">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-white font-bold leading-normal mb-1">
            {name}
          </h3>
        </div>
        <div className="py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="px-4">
              {allFollowings?.some((following) => following._id === _id) ? (
                <span
                  onClick={() => handleRemoveFollow(_id, name)}
                  className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700"
                >
                  <span>
                    <RiUserUnfollowLine />
                  </span>
                  <span className="md:block">Unfollow</span>
                </span>
              ) : (
                <span
                  onClick={() => handleAddFollow(_id, name)}
                  className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700"
                >
                  <span>
                    <RiUserAddLine />
                  </span>
                  <span className="md:block">Follow</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersCard;
