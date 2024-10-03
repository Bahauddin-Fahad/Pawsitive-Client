const AboutBanner = () => {
  return (
    <div className="my-14">
      <div
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
        className="w-full h-[420px] md:h-[380px] bg-center bg-cover bg-fixed text-white"
      >
        <div className="w-full h-full bg-gray-900/60 flex flex-col lg:flex-row items-center">
          {/* Text Section */}
          <div className="text-white text-center lg:text-left lg:ml-8 flex-1 mt-24 lg:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold mx-3 md:mx-6 lg:mx-0">
              Uncover the hidden wonders and treasures of popular travel
              destinations.
            </h1>
          </div>

          {/* Icon Section with Inline SVG */}
          <div className="flex justify-center lg:justify-end lg:mr-8 xl:mr-20 mb-10 md:mb-14 lg:mb-0">
            <svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 opacity-90"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
