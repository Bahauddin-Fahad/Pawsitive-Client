import Header from "./_components/Header";
import MeetTheTeam from "./_components/MeetTheTeam";
import Missions from "./_components/Missions";

const About = () => {
  return (
    <div className="max-w-xs xs:max-w-md sm:max-w-2xl xl:max-w-6xl px-2 mx-auto space-y-20 py-10">
      <Header />
      <Missions />
      <MeetTheTeam />
    </div>
  );
};

export default About;
