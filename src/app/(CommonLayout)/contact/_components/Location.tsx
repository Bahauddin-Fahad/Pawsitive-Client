import { AiTwotoneStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiDirectionSign } from "react-icons/gi";
import { MdCellWifi } from "react-icons/md";
import SectionTitle from "../../_components/SectionTitle";

const Location = () => {
  return (
    <div className="space-y-5">
      <SectionTitle
        sub="PROVIDING EXEPTOPNAL PET CARE SERVICE"
        heading="OUR OFFICE LOCATION"
      />

      <div className="p-3 border border-white w-full rounded-lg">
        <div className="p-10 shadow-xl">
          <div>
            <div className="lg:flex justify-between">
              <div>
                <p className="text-2xl font-semibold text-white">
                  <span>Pawsitive </span>
                  <span className="text-accent">Tips and Stories</span>
                </p>
                <p className="text-white">GEC Circle, Chattogram, Bangladesh</p>
              </div>

              <div className="flex justify-end gap-x-3">
                <div className="bg-accent bg-opacity-70 h-20 w-20 text-white grid justify-center items-center">
                  <p className="text-4xl">
                    <GiDirectionSign />
                  </p>
                  <p className="-mt-6">Direction</p>
                </div>

                <div className="bg-accent bg-opacity-70 h-20 w-20 text-white grid justify-center items-center">
                  <p className="text-4xl">
                    <MdCellWifi />
                  </p>
                  <p className="-mt-6">save</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div>
                <p className="flex items-center text-lg font-semibold text-white">
                  4.5
                  <span className="flex text-xl">
                    <AiTwotoneStar
                      className=""
                      data-aos="fade-right"
                      data-aos-delay="100"
                    />
                    <AiTwotoneStar
                      className=""
                      data-aos="fade-right"
                      data-aos-delay="140"
                    />
                    <AiTwotoneStar
                      className=""
                      data-aos="fade-right"
                      data-aos-delay="180"
                    />
                    <AiTwotoneStar
                      className=""
                      data-aos="fade-right"
                      data-aos-delay="220"
                    />
                    <span className="text-lg">
                      <FaStarHalfAlt
                        className=""
                        data-aos="fade-right"
                        data-aos-delay="260"
                      />
                    </span>
                  </span>
                </p>
                <p
                  className="text-gray-600 text-sm"
                  data-aos="fade-right"
                  data-aos-delay="50"
                >
                  150 Reviews
                </p>
              </div>

              <div>
                <button className="bg-white px-5 py-3 rounded-full text-black tracking-wide font-semibold">
                  View Larger Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
