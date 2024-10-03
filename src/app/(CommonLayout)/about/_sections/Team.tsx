import SectionTitle from "../../../../components/ui/section/SectionTitle";
import Image from "next/image";

const Team = () => {
  return (
    <div className="my-14">
      <SectionTitle sub="OUR TEAM" heading="MEET OUR EXPERT TEAM" />

      <div className="py-20">
        <div className="xl:container mx-auto px-6 md:px-12">
          <div className="grid gap-6 px-4 sm:px-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            <div className="group relative rounded-3xl space-y-6 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1592009309602-1dde752490ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                alt="man"
                className="mx-auto h-[26rem] w-full grayscale object-cover object-center transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                // Adjust as needed (see below)
                width={640} // Optional (redundant with layout="fill")
                height={805} // Optional (redundant with layout="fill")
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-primary translate-y-36 md:translate-y-[144px] lg:translate-y-[105px] xl:translate-y-36 transition duration-300 ease-in-out group-hover:translate-y-0">
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Alex Johnson
                  </h4>
                  <span className="block text-sm text-gray-300">
                    Travel Content Curator
                  </span>
                </div>
                <p className="mt-8 text-gray-300">
                  Hey Travelers! Our team just released new guides with hidden
                  gems and essential tips. Check them out and share your travel
                  stories!
                </p>
              </div>
            </div>
            <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
              <Image
                src="https://thumbs.dreamstime.com/b/portrait-successful-business-woman-standing-her-office-middle-aged-businesswoman-247118849.jpg"
                alt="woman"
                className="mx-auto h-[26rem] w-full grayscale object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                width={640}
                height={805}
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-primary translate-y-32 md:translate-y-[120px] lg:translate-y-[105px] xl:translate-y-[145px] transition duration-300 ease-in-out group-hover:translate-y-0">
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Emily Rodriguez
                  </h4>
                  <span className="block text-sm text-gray-300">
                    Destination Expert
                  </span>
                </div>
                <p className="mt-8 text-gray-300">
                  Hey Travelers! Check out our latest destination guides for
                  stunning spots and insider tips. Share your favorites with us!
                </p>
              </div>
            </div>
            <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="man"
                className="mx-auto h-[26rem] w-full grayscale object-cover object-center transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                width={640}
                height={805}
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-primary translate-y-32 md:translate-y-[120px] lg:translate-y-[90px] xl:translate-y-[120px] transition duration-300 ease-in-out group-hover:translate-y-0">
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Chris Thompson
                  </h4>
                  <span className="block text-sm text-gray-300">
                    Adventure Guide Specialist
                  </span>
                </div>
                <p className="mt-8 text-gray-300">
                  Hey Adventurers! Check out our latest guides for thrilling
                  activities and tips. Share your experiences with us!
                </p>
              </div>
            </div>
            <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="man"
                className="mx-auto h-[26rem] w-full grayscale object-cover object-bottom transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                width={640}
                height={805}
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-primary translate-y-36 md:translate-y-[120px] lg:translate-y-[67px] xl:translate-y-[120px] transition duration-300 ease-in-out group-hover:translate-y-0">
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Sophia Lee
                  </h4>
                  <span className="block text-sm text-gray-300">
                    Community Engagement Manager
                  </span>
                </div>
                <p className="mt-8 text-gray-300">
                  Hey Travelers! We want to hear your stories! Join the
                  conversation and share your adventures with us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
