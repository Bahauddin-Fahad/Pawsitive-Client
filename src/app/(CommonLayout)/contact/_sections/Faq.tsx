"use client";
import { useState } from "react";

const Faq = () => {
  const dataArr = [
    {
      title: "What is the best time to book flights?",
      description:
        "Generally, the best time to book flights is around 4-6 weeks before your departure date. However, this can vary depending on the destination and airline.",
    },
    {
      title: "How can I save money on accommodation?",
      description:
        "Consider staying in hostels, guesthouses, or apartments, especially if you're traveling on a budget. Also, look for deals and discounts online.",
    },
    {
      title: "What should I pack for a trip?",
      description:
        "Pack versatile clothing that can be layered, and don't forget essentials like passport, medications, and chargers. Check the weather forecast for your destination.",
    },
    {
      title: "How can I stay safe while traveling?",
      description:
        "Research your destination, be aware of your surroundings, and avoid carrying excessive amounts of cash or valuables. Let someone know your itinerary.",
    },
    {
      title: "What should I do if I lose my passport?",
      description:
        "Contact your embassy or consulate immediately. They can help you obtain a replacement passport.",
    },
  ];

  const [isOpen, setIsOpen] = useState(null);
  const handleToggle = (idx: any) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 my-12 lg:my-16">
      <div className="flex-1 mx-3">
        <h1 className="lg:text-xl text-primary border-l-[10px] border-backup pl-2 font-bold">
          FAQ
        </h1>
        <h1 className="text-2xl md:text-4xl lg:text-3xl xl:text-4xl mt-8 font-bold text-center lg:text-left">
          Most Common Travel Question
        </h1>
        <div className="mt-11">
          <div className="flex w-full justify-center">
            <div className="w-fit xl:w-full mx-auto cursor-pointer space-y-6">
              {/* mapping each accordion  */}
              {dataArr.map((data, idx) => (
                <div
                  key={idx}
                  onClick={() => handleToggle(idx)}
                  className="flex items-center"
                >
                  {/* the index div  */}
                  <div className="flex size-16 select-none items-center justify-center rounded-md bg-primary text-2xl font-semibold text-white">
                    <span>0{idx + 1}</span>
                  </div>

                  <div className="relative h-[2px] w-10 bg-primary">
                    <span className="absolute -left-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 border-primary bg-white"></span>
                    <span className="h-1 w-10 bg-primary"></span>
                    <span
                      className={`absolute -right-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 ${
                        isOpen === idx
                          ? "border-primary bg-white delay-100"
                          : "border-transparent"
                      }`}
                    ></span>
                  </div>

                  {/* main accordion div  */}
                  <div className="text-center">
                    <div className="relative max-w-[450px] border-t-[12px] border-backup bg-sky-50 p-3 shadow-md">
                      <span className="absolute right-0 top-0 h-0 w-0 border-b-[40px] border-r-[40px] border-b-transparent border-r-backup"></span>
                      <h1 className="select-none text-lg text-zinc-700">
                        {data.title}
                      </h1>
                    </div>
                    <div
                      className={`grid overflow-hidden text-slate-600 transition-all duration-300 ease-in-out ${
                        isOpen === idx
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="max-w-[450px] bg-primary p-6 text-sm text-white">
                          {data.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-10 lg:mt-0">
        <h1 className="lg:text-xl text-primary border-l-[10px] border-backup pl-2 font-bold">
          GET IN TOUCH
        </h1>

        <div className="mt-8">
          <form>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-primary focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block font-semibold">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-primary focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="mb-3 block font-semibold">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-primary focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block font-semibold">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                id="message"
                placeholder="Type your message"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-primary focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button className="group relative z-10 h-14 w-full overflow-hidden bg-primary text-lg md:text-xl text-white rounded-3xl">
                <span className="absolute -inset-44 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                <span className="absolute -inset-44 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -inset-44 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                  Send Message
                </span>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Faq;
