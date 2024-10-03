const CallToAction = () => {
  return (
    <div className="my-14">
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1491446559770-3fc03a481cdf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
        className="w-full h-[420px] md:h-[380px] bg-center bg-cover bg-fixed text-white"
      >
        <div className="w-full h-full bg-gray-900/60 flex flex-col lg:flex-row items-center">
          {/* Text Section */}
          <div className="text-white text-center lg:text-left lg:ml-8 flex-1 mt-24 lg:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold mx-3 md:mx-6 lg:mx-0">
              Discover off-the-beaten-path experiences in iconic destinations.
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
                d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
