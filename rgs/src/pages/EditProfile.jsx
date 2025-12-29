 import { ArrowLeft } from "lucide-react";
import { PiCamera } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState("/profile_pic.svg");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // 📷 Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // ✉️ Email validation sss
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // 💾 Save button
  const handleSubmit = () => {
    if (emailError || !email) {
      setEmailError("Please enter a valid email address");
      return;
    }
    alert("Profile updated successfully!");
  };

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
    Edit Profile
  </h2>
</div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative w-28 h-28 rounded-full bg-[#D5CECE] border-4 border-[#7E7B7B] flex items-center justify-center">
          <img
            src={avatar}
            alt="user"
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* Camera Icon */}
          <div
            className="absolute bottom-0 right-0 bg-[#860D0D] p-2 rounded-full cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <PiCamera size={20} className="text-white" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form */}
      <div className="w-full flex items-center justify-center px-6 mt-8">
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[35%] xl:w-[30%] space-y-4">
          
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-[#181818]">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-[#BFB2B2] outline-none placeholder:text-[#636364]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#181818]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className={`w-full mt-1 px-4 py-3 rounded-lg outline-none placeholder:text-[#636364]
                ${emailError ? "border border-red-500" : "border border-[#BFB2B2]"}`}
            />

            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#F24E4E] text-white py-3 rounded-lg font-semibold mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
