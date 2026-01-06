import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const colorMap = {
  red: {
    discount: "text-[#E21313]",
    border: "border-[#FBDD63]",
    button: "bg-[#F24A4A]",
  },
  blue: {
    discount: "text-[#007BFF]",
    border: "border-blue-300",
    button: "bg-[#F24A4A]",
  },
  black: {
    discount: "text-black",
    border: "border-black/20",
    button: "bg-[#F24A4A]",
  },
};

const BASE_URL = import.meta.env.VITE_API_URL;


const OfferDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("OfferDetails state:", state);

  if (!state) return null;

  const { discount, brand, logo, note,lat,lng, variant = "red" } = state;
  const colors = colorMap[variant];

  return (
    <div className="min-h-screen bg-white font-poppins px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center mb-0 lg:mb-6">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Discount + Logo */}
        <div className="flex items-center justify-between mb-3">
          <h1 className={`text-[28px] font-bold ${colors.discount}`}>
            {discount}% OFF
          </h1>
         <img
  src={logo?.startsWith("/uploads") ? `${BASE_URL}${logo}` : logo}
  alt={brand}
  className="h-16 object-contain"
/>

        </div>

        {/* Description */}
        <p className="text-sm text-[#777777] leading-relaxed mb-6">
          {note}
        </p>

        {/* Map */}
       {lat && lng && (
  <div
    className={`rounded-2xl overflow-hidden mb-8 border ${colors.border}
    shadow-[0_6px_20px_rgba(240,230,140,0.3)]`}
  >
    <iframe
      title="map"
      width="100%"
      height="300"
      loading="lazy"
      allowFullScreen
      className="border-0"
      src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
    />
  </div>
)}

        {/* Redeem Button */}
        <button
          className={`w-full text-white py-3 rounded-xl font-semibold
          ${colors.button} transition`}
        >
          Redeem
        </button>

      </div>
    </div>
  );
};

export default OfferDetails;
