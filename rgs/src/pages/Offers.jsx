import { Menu } from "lucide-react";
import { CiBookmark } from "react-icons/ci";
import { HiMiniBookmark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useEffect } from "react";
import axios from "axios";
import api from "../utils/api.js";
const colorMap = {
    red: {
        discount: "text-[#E21313]",
        code: "text-[#F42828]",
        bookmark: "text-red-400",
    },
    blue: {
        discount: "text-[#007BFF]",
        code: "text-[#007BFF]",
        bookmark: "text-blue-500",
    },
    black: {
        discount: "text-black",
        code: "text-black",
        bookmark: "text-black",
    },
};

const OfferCard = ({
    discount,
    brand,
    code,
    logo,
    id,
    note,
    lat,
    lng,
    variant = "red",
    isFilled = false,
    onToggleBookmark,
}) => {
    const navigate = useNavigate();
    const colors = colorMap[variant];

   
    const token = localStorage.getItem("token"); // make sure you saved it on login


    const handleCardClick = () => {
        navigate(`/offers/${id}`, {
            state: { discount, brand, code, logo, note,lat,lng, variant },
        });
    };

    // const handleBookmarkClick = (e) => {
    //     e.stopPropagation(); // ⛔ prevent navigation
    //     setBookmarked((prev) => !prev);
    // };

   const handleBookmarkClick = (e) => {
  e.stopPropagation();
  onToggleBookmark(id);
};



    return (
       <div className="transition-all duration-300 ease-in-out flex flex-col items-center justify-between bg-white rounded-xl p-4 shadow-sm mb-4">

            <div
                onClick={handleCardClick}
                className="w-full flex items-center justify-between"
            >
                <h3 className={`text-2xl font-poppins font-bold ${colors.discount}`}>
                    {discount}% OFF
                </h3>

                <div className="flex items-center relative">
                    <img
                        src={logo}
                        alt={brand}
                        className=" mr-5 lg:mr-7 object-contain"
                    />

                    {/* 🔁 Toggle bookmark */}
                   <span onClick={handleBookmarkClick}>
  {isFilled ? (
    <HiMiniBookmark
      size={20}
      className="absolute top-0 right-0 text-red-500 cursor-pointer"
    />
  ) : (
    <CiBookmark
      size={22}
      className="absolute top-0 right-0 text-red-500 cursor-pointer"
    />
  )}
</span>

                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-base text-[#888888]">Grab your earning now</p>
                <p className={`text-sm font-bold mr-0 lg:mr-7 ${colors.code}`}>
                    CODE: <span className="font-bold">{code}</span>
                </p>
            </div>
        </div>
    );
};


const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
const token = localStorage.getItem("accessToken"); // make sure you saved it on login

const handleToggleBookmark = async (offerId) => {
  try {
   await api.post(`/api/offers/${offerId}/bookmark`);

    // 🔥 Update UI immediately
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId
          ? { ...offer, isBookmarked: !offer.isBookmarked }
          : offer
      )
    );
  } catch (error) {
    console.error("Bookmark update failed:", error);
  }
};

const fetchOffers = async () => {
  try {
    setLoading(true);
   const res = await api.get("/api/offers");
    setOffers(res.data);
  } catch (error) {
    console.error("Failed to fetch offers:", error);
  } finally {
    setLoading(false);
  }
};


  // Fetch offers from backend
  useEffect(() => {
  fetchOffers();
}, []);
console.log("Offers data:", offers);

const bookmarkedOffers = offers.filter(
  (offer) => offer.isBookmarked
);

const nearYouOffers = offers.filter(
  (offer) => !offer.isBookmarked && offer.nearYou
);

const otherOffers = offers.filter(
  (offer) => !offer.isBookmarked && !offer.nearYou
);


  return (
    <div className="w-full min-h-screen bg-[#FFEDED] font-poppins p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">EARNINGS</h1>
          <div className="flex items-center gap-3">
            <img src="/refresh.svg" alt="refresh icon" onClick={fetchOffers} className="w-6 h-6" />
            <Menu
              className="cursor-pointer"
              onClick={() => setOpen(true)}
              size={24}
            />
          </div>
          <Sidebar isOpen={open} onClose={() => setOpen(false)} />
        </div>

        {/* Offers */}
       {/* Offers */}
{loading ? (
  <p>Loading offers...</p>
) : (
  <>
    {/* ⭐ Bookmarked Offers */}
    {bookmarkedOffers.map((offer) => (
      <OfferCard
        key={offer._id}
        id={offer._id}
        discount={offer.discount}
        brand={offer.brandName}
        code={offer.code}
        logo={offer.logo}
        note={offer.note}
        lat={offer.lat} 
        lng={offer.lng}
        variant="red"
        isFilled={true}
        onToggleBookmark={handleToggleBookmark}
      />
    ))}

    {/* 📍 Near You Heading */}
    {nearYouOffers.length > 0 && (
      <h2 className="text-lg font-bold text-[#555353] mt-6 mb-3">
        Near You
      </h2>
    )}

    {/* 📍 Near You Offers */}
    {nearYouOffers.map((offer) => (
      <OfferCard
        key={offer._id}
        id={offer._id}
        discount={offer.discount}
        brand={offer.brandName}
        code={offer.code}
        note={offer.note} 
        lat={offer.lat}
        lng={offer.lng}
        logo={offer.logo}
        variant="blue"       // 🔵 BLUE COLOR
        isFilled={offer.isBookmarked}
        onToggleBookmark={handleToggleBookmark}
      />
    ))}

    {/* 🏷 Other Heading */}
    {otherOffers.length > 0 && (
      <h2 className="text-lg font-bold text-[#555353] mt-6 mb-3">
        Other Offers
      </h2>
    )}

    {/* 🏷 Other Offers */}
    {otherOffers.map((offer) => (
      <OfferCard
        key={offer._id}
        id={offer._id}
        discount={offer.discount}
        brand={offer.brandName}
        code={offer.code}
        note={offer.note} 
        lat={offer.lat}
        lng={offer.lng}
        logo={offer.logo}
        variant="black"
        isFilled={false}
        onToggleBookmark={handleToggleBookmark}
      />
    ))}
  </>
)}


      </div>
    </div>
  );
};

 

export default Offers;
