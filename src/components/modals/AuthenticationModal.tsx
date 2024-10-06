import Link from "next/link";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface IAuthModalProps {
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
}

const AuthenticationModal = ({
  openAuthModal,
  setOpenAuthModal,
}: IAuthModalProps) => {
  return (
    <div className="mx-auto flex w-96 items-center justify-center">
      {openAuthModal && (
        <div
          onClick={() => setOpenAuthModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openAuthModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute w-96 rounded-lg bg-zinc-500 p-6 text-center drop-shadow-2xl opacity-1 translate-y-0 duration-300"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <MdOutlineReportGmailerrorred className="size-20" />
              <h6 className="text-center text-sm font-medium ">
                Please login to post pet tips & stories!
              </h6>
              <div className="flex gap-2">
                <Link href={"/login"}>
                  <button className="btn-md rounded-md bg-primary px-6 text-sm text-black">
                    Login
                  </button>
                </Link>
                <button
                  onClick={() => setOpenAuthModal(false)}
                  className="rounded-md border border-white px-6 text-sm text-white hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationModal;
