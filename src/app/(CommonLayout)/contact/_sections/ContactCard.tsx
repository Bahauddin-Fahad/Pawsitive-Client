import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

const ContactCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-500 mb-4">
          <MdOutlineMail className="text-3xl text-backup" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold mb-2">Email Support</h3>
        <p className="text-gray-600">
          support@traveltrove.tld
          <br />
          travel.trove@gmail.com
        </p>
      </div>

      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-500 mb-4">
          <MdOutlinePhoneInTalk className="text-3xl text-backup" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold mb-2">Let's Talk</h3>
        <p className="text-gray-600">
          Phone:+6221.2002.2012
          <br />
          Fax : +6221.2002.2013
        </p>
      </div>

      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-500 mb-4">
          <HiOutlineChatAlt2 className="text-3xl text-backup" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold mb-2">Forum</h3>
        <p className="text-gray-600">
          Discuss Anything on Our
          <br />
          Forum & Community.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary-500 mb-4">
          <IoLocationOutline className="text-3xl text-backup" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        <p className="text-gray-600">
          Honey Business, 24 Fifth
          <br />
          street, Los Angeles, USA.
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
