import PageSectionTitle from "@/src/components/ui/section/PageSectionTitle";
import Team from "./_sections/Team";
import Headers from "./_sections/Headers";
import Missions from "./_sections/Missions";
import AboutBanner from "./_sections/AboutBanner";

const About = () => {
  return (
    <div>
      <PageSectionTitle
        title="About Us"
        description="Learn about our passion and how it all began."
      />
      <Headers />
      <Missions />
      <Team />
      <AboutBanner />
    </div>
  );
};

export default About;
