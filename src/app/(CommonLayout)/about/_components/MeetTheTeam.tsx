/* eslint-disable jsx-a11y/anchor-is-valid */
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import React from "react";

const MeetTheTeam = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col mt-8">
          {/* Meet the Team */}
          <div className="container max-w-7xl px-4 space-y-5">
            {/* Section Header */}
            <div className="max-w-xl mx-auto">
              <SectionTitle
                sub="MEET THE TEAM DEDICATED TO PET'S WELL-BEING"
                heading="OUR STAFFS"
              />
            </div>

            {/* Team Members */}
            <div className="flex flex-wrap">
              {/* Member #1 */}
              <TeamMember
                name="Tranter Jaskulski"
                title="Founder & Specialist"
                imgSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />

              {/* Member #2 */}
              <TeamMember
                name="Denice Jagna"
                title="Pet Care Expert"
                imgSrc="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />

              {/* Member #3 */}
              <TeamMember
                name="Kenji Milton"
                title="Veterinary Consultant"
                imgSrc="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />

              {/* Member #4 */}
              <TeamMember
                name="John Bredshow"
                title="Pet Trainer"
                imgSrc="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMember = ({
  name,
  title,
  imgSrc,
}: {
  name: string;
  title: string;
  imgSrc: string;
}) => (
  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4 mx-auto">
    <div className="flex flex-col">
      {/* Avatar */}
      <a href="#" className="mx-auto">
        <img
          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 h-[300px] w-[250px] object-cover"
          src={imgSrc}
          alt={name}
        />
      </a>

      {/* Details */}
      <div className="text-center mt-6">
        {/* Name */}
        <h1 className="text-secondary text-xl font-bold mb-1">{name}</h1>
        {/* Title */}
        <div className="text-white font-light mb-2">{title}</div>
      </div>
    </div>
  </div>
);

export default MeetTheTeam;
