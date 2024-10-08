/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */

import { useUser } from "@/src/context/user.provider";
import { useStartPremium } from "@/src/hooks/premium.hook";
import { updateAccessTokenInCookies } from "@/src/utils/updateAccessTokenInCookies";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { LuCrown } from "react-icons/lu";

const VerifyModal = ({ user, openModal, setOpenModal }: any) => {
  const { updateProfile } = useUser();

  const handleSuccess = (data: any) => {
    toast.dismiss();

    if (data.paymentSession.result) {
      toast.success("Subscribed to Premium plan successfully!");
      window.location.href = data.paymentSession.payment_url;
    }

    updateProfile(data.data);

    updateAccessTokenInCookies(data.data);
  };

  const { mutate: handleStartPremium } = useStartPremium(handleSuccess);

  const handlePayment = () => {
    try {
      const transactionId = `TXN-${Date.now()}`;

      const payload = {
        transactionId,
        paymentStatus: "Pending",
        premiumStart: format(new Date(), "dd-MM-yyyy"),
        premiumEnd: format(
          new Date(new Date().setMonth(new Date().getMonth() + 1)),
          "dd-MM-yyyy"
        ), // one month later// one month later
        premiumCharge: 99,
      };

      toast.loading("Processing payment...");
      handleStartPremium(payload);

      setOpenModal(false);
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while processing the payment");
      console.error("Client Error:", error);
    }
  };
  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute lg:w-[750px] mx-auto rounded-lg bg-custom p-6 text-center drop-shadow-2xl opacity-1 translate-y-0 duration-300 overflow-y-auto h-fit max-h-screen md:overflow-auto"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Content Part */}
              <div>
                <h1 className="text-center text-3xl lg:text-4xl font-bold flex items-center gap-2 justify-center">
                  <span>
                    <LuCrown className="size-7 text-primary" />
                  </span>
                  <span>Premium Subscription Plan</span>
                </h1>
                <div className="mt-6 grid justify-center items-center gap-6 md:grid-cols-2">
                  <div className="group relative md:col-span-1">
                    <div
                      aria-hidden="true"
                      className="absolute top-0 h-full w-full rounded-3xl border border-primary shadow-2xl shadow-gray-600/10 transition duration-500"
                    />
                    <div className="relative space-y-8 p-8">
                      <h3 className="text-center text-3xl font-semibold text-secondary">
                        Monthly
                      </h3>
                      <div className="relative flex justify-around">
                        <div className="flex">
                          <span className="-ml-6 mt-2 text-3xl font-bold text-primary">
                            ৳
                          </span>
                          <span className="leading-0 text-8xl font-bold text-white ">
                            99
                          </span>
                        </div>
                        <span className="absolute right-0 lg:right-1 bottom-2 text-xl font-bold text-primary">
                          / Month
                        </span>
                      </div>
                      <ul
                        role="list"
                        className="m-auto w-max space-y-4 pb-6 text-white"
                      >
                        <div className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Unlock Exclusive Content</span>
                        </div>
                        <li className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Profile Verification Badge</span>
                        </li>
                        <li className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Access Premium Pet Tips</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="group relative md:col-span-1">
                    <div
                      aria-hidden="true"
                      className="absolute top-0 h-full w-full rounded-3xl border border-primary shadow-2xl shadow-gray-600/10 transition duration-500"
                    />
                    <div className="relative space-y-8 p-8">
                      <h3 className="text-center text-3xl font-semibold text-secondary dark:text-white">
                        Free
                      </h3>
                      <div className="relative flex justify-around">
                        <div className="flex">
                          <span className="-ml-2 mt-2 text-3xl font-bold text-primary">
                            ৳
                          </span>
                          <span className="leading-0 text-8xl font-bold text-white dark:text-white">
                            0
                          </span>
                        </div>
                      </div>
                      <ul
                        role="list"
                        className="m-auto w-max space-y-4 pb-6 text-white"
                      >
                        <div className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Create & Share Posts</span>
                        </div>
                        <li className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Follow Pet Lovers</span>
                        </li>
                        <li className="space-x-2 flex items-center">
                          <HiOutlineBadgeCheck className="size-6 text-primary" />
                          <span>Comment on Stories</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex gap-2 w-80">
                <button
                  onClick={handlePayment}
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <span className="relative text-base font-semibold text-black">
                    Start Premium
                  </span>
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-custom before:border before:border-secondary  before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <span className="relative text-base font-semibold text-secondary">
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyModal;
