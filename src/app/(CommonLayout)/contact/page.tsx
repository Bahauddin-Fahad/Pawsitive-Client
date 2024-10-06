import Location from "./_components/Location";
import Contact from "./_components/Contact";
import PageSectionTitle from "../_components/PageSectionTitle";

const ContactPage = () => {
  return (
    <div className="max-w-xs xs:max-w-md sm:max-w-2xl xl:max-w-6xl px-2 mx-auto space-y-20 py-10">
      <PageSectionTitle
        title="Contact Us"
        description="We would love to hear from you."
      />
      <Contact />
      <Location />
    </div>
  );
};

export default ContactPage;
