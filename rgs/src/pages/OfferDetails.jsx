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

const OfferDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return null;

  const { discount, brand, logo, variant = "red" } = state;
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
            {discount} OFF
          </h1>
          <img src={logo} alt={brand} className="h-24 object-contain" />
        </div>

        {/* Description */}
        <p className="text-sm text-[#777777] leading-relaxed mb-6">
          Enjoy your favorite dishes at irresistible discounts! From spicy
          delights to sweet indulgences, treat yourself without breaking the
          bank. Hurry!
        </p>

        {/* Map */}
        <div
          className={`rounded-2xl overflow-hidden mb-8 border ${colors.border}
          shadow-[0_6px_20px_rgba(240,230,140,0.3)]`}
        >
          <img
            src="/map.svg"
            alt="map"
            className="w-full h-[300px] object-cover"
          />
        </div>

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
