 import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFEDED]">
      
      {/* Header */}
       <div className="relative flex items-center gap-4 h-[20vh] bg-[#F24E4E] px-5 pt-6 overflow-hidden">

  {/* Circle 1 – Biggest */}
  <div className="absolute -top-28 -right-50 sm:-right-45 w-72 h-61 sm:h-65 rounded-full bg-[#C53838] z-30" />
  <div className="absolute -top-28 -right-40 sm:-right-27 w-72 h-60 sm:h-64 rounded-full bg-[#CC4545] z-20" />
  <div className="absolute -top-28 -right-30 sm:-right-12 w-72 h-60 sm:h-64 rounded-full bg-[#E98989] z-10" />

 

  <ArrowLeft
    className="text-white cursor-pointer z-10"
    onClick={() => navigate(-1)}
  />

  <h2 className="text-white text-2xl font-bold z-10">
     Profile
  </h2>
</div>

      {/* Profile Card */}
      <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center mt-8">
        <div className="w-28 h-28 rounded-full border-3 bg-[#D5CECE] border-[#7E7B7B] flex items-center justify-center shadow-md">
          <img
            src="/profile_pic.svg"
            alt="user"
            className="w-24 h-24 rounded-full"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold">John</h3>
        <p className="mt-1 text-sm text-[#D93B3B] bg-[#FFDADA] px-8 py-1 rounded-lg font-semibold">
          John123@gmail.com
        </p>
      </div>

      {/* Menu Options */}
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[35%] xl:w-[30%] mt-8 bg-white rounded-xl shadow-md divide-y divide-[#E6E4E4]">
        {[
  { label: "Edit Profile", action: () => navigate("/edit-profile") },
  { label: "Settings", action: () => {} },
  { label: "About Us", action: () => {} },
  { label: "Log Out", action: () => {} },
].map((item, index) => (
  <div
    key={index}
    onClick={item.action}
    className="flex justify-between items-center px-5 py-4 text-[#444242] cursor-pointer hover:bg-gray-100 transition"
  >
    {item.label}
    <span className="text-[#9C9999]">
      <ChevronRight />
    </span>
  </div>
))}

      </div>
      </div>
      <p className="text-base font-medium text-center text-[#888888] pt-14">1000 V points Contact to redeem</p>
    </div>
  );
};

export default Profile;