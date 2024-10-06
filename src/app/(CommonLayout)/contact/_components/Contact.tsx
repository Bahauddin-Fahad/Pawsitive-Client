"use client";
import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";

const Contact = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center gap-2 border border-white p-5 rounded-2xl h-full"
        >
          <BsFillPersonFill className="w-16 h-16 text-accent" />
          <h2 className="text-xl text-white font-bold">Pawsitive</h2>
        </div>
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center gap-2 border border-white p-5 rounded-2xl h-full"
        >
          <BsTelephoneFill className="w-16 h-16 text-accent" />
          <h2 className="text-xl text-white font-bold">+8801861234567</h2>
        </div>
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center gap-2 border border-white p-5 rounded-2xl h-full"
        >
          <MdEmail className="w-16 h-16 text-accent" />
          <h2 className="text-xl text-white font-bold">
            pawsitive01@gmail.com
          </h2>
        </div>
        <div
          data-aos="zoom-in"
          className="flex flex-col items-center gap-2 border border-white p-5 rounded-2xl h-full"
        >
          <MdLocationPin className="w-16 h-16 text-accent" />
          <h2 className="text-xl text-white font-bold">
            Chattogram,Bangladesh
          </h2>
        </div>
      </div>
      <div className="card">
        <form className="card-body p-0">
          <div className="flex flex-col lg:flex-row gap-2 mt-5">
            <div className="form-control lg:w-1/2">
              <input
                className="input input-bordered"
                type="text"
                placeholder="Name"
                name="userName"
              />
            </div>
            <div className="form-control lg:w-1/2">
              <input
                className="input input-bordered"
                type="text"
                placeholder="Email Address"
                name="userEmail"
              />
            </div>
          </div>
          <div className="form-control">
            <input
              className="input input-bordered"
              type="text"
              placeholder="Subject"
              name="subject"
            />
          </div>
          <div className="form-control">
            <textarea
              className="input input-bordered h-20 placeholder:pt-2"
              placeholder="Your Message"
              name="message"
            />
          </div>
          <div className="form-control mt-2 w-full">
            <button
              className="btn btn-accent font-bold"
              type="submit"
              value="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
