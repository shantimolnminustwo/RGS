import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { LuTicketPercent } from "react-icons/lu";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar (RIGHT SIDE) */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* Header */}
        <div className=" h-[25vh] p-5 flex items-end  gap-3 rounded-b-2xl bg-[url(/sidebar_head.svg)] bg-cover">
          {/* <ArrowLeft
            className="text-white cursor-pointer mb-5"
            onClick={onClose}
          /> */}
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-6 mt-5">
          <Link to="/" className="flex items-center gap-3 text-lg font-medium">
        <GoHomeFill className="text-[#737070]"/> Home
          </Link>
        <Link
  to="/profile"
  onClick={onClose}
  className="flex items-center gap-3 text-lg font-medium"
>
  <img src="./user.svg" alt="" className="w-5" />
  Profile
</Link>
          <Link to="/redeemed-offers" className="flex items-center gap-3 text-lg font-medium">
            <LuTicketPercent  className="text-[#737070]"/> Redeemed Coupons
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
