import { FaThumbsUp } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import SectionTitle from "../../../../components/ui/section/SectionTitle";
import {
  MdFlightTakeoff,
  MdGroups,
  MdOutlineTravelExplore,
} from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";

const Missions = () => {
  return (
    <div className="space-y-5 my-14">
      <SectionTitle
        sub="GUIDING TRAVELERS, SHAPING EXPERIENCES"
        heading="OUR MISSION & VISION"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grow-[2] w-full py-12 gap-3">
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <MdFlightTakeoff className="text-5xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold text-primary">
              Empowering Travel Experiences
            </p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To enrich our community of travel enthusiasts by providing a
              platform where individuals can share their unique travel stories,
              fostering a deeper connection and appreciation for diverse
              cultures.
            </p>
          </div>
        </div>
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <FaThumbsUp className="text-4xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold">
              Promoting Responsible Travel
            </p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To encourage sustainable and responsible travel practices by
              sharing valuable tips and resources, helping travelers make
              informed choices that benefit local communities and the
              environment.
            </p>
          </div>
        </div>
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <MdGroups className="text-5xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold">Community-Driven Insights</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To prioritize our users' voices by facilitating an open exchange
              of travel advice, tips, and experiences, ensuring everyone feels
              heard and valued within our community.
            </p>
          </div>
        </div>
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <GiPathDistance className="text-4xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold">
              Leading Destination Resource
            </p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To become the premier destination for travel advice and
              destination guides, known for exceptional content, user
              engagement, and a supportive travel community.
            </p>
          </div>
        </div>
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <MdOutlineTravelExplore className="text-5xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold">
              Inspiring Global Exploration
            </p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To cultivate a passion for exploration by inspiring travelers to
              embark on new adventures, discover hidden gems, and share their
              insights to benefit fellow wanderers.
            </p>
          </div>
        </div>
        <div className="h-[240px] border border-primary flex gap-y-3 flex-col justify-center items-center">
          <div className="size-16 flex items-center justify-center rounded-full border-2 border-primary">
            <LiaUserFriendsSolid className="text-5xl text-backup" />
          </div>
          <div className="space-y-2">
            <p className="text-center font-bold">
              Creating Memorable Connections
            </p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To foster a vibrant community where travelers can connect,
              collaborate, and share unforgettable experiences, making every
              journey a shared adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
