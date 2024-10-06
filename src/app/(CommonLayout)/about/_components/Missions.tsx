import { FaPaw, FaHeartbeat, FaHandsHelping, FaLeaf } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import SectionTitle from "../../_components/SectionTitle";

const Missions = () => {
  return (
    <div className="space-y-5 my-14">
      <div className="max-w-xl mx-auto">
        <SectionTitle
          sub="CARING FOR PETS, EMPOWERING OWNERS"
          heading="OUR MISSION & VISION"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grow-[2] w-full">
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <FaPaw className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Promote Pet Wellness</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To provide valuable tips and advice to ensure the health and
              well-being of pets, making pet care easier for owners.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <GiDogHouse className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Safe & Loving Homes</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To encourage the creation of safe, loving environments for pets,
              offering tips on comfort and housing.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <FaHeartbeat className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Healthy Living</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To promote a balanced lifestyle with proper nutrition, exercise,
              and care to ensure pets thrive.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <FaHandsHelping className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Supportive Community</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To build a community of pet owners that support one another
              through shared experiences and expert advice.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <FaLeaf className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Sustainable Pet Care</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To encourage eco-friendly pet care practices that reduce
              environmental impact and promote sustainability.
            </p>
          </div>
        </div>
        <div className="h-[230px] border border-secondary dark:border-white flex gap-y-3 flex-col justify-center items-center dark:bg-transparent">
          <MdPets className="text-5xl text-primary" />
          <div className="space-y-2">
            <p className="text-center font-bold">Expert Pet Guidance</p>
            <p className="text-center text-sm max-w-xs px-5 lg:px-0">
              To offer expert guidance and trusted resources for pet owners,
              ensuring the best care for their beloved companions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
