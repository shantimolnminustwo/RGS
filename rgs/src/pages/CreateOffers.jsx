import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CreateOfferModal from "./CreateOfferModal";
import api from "../utils/api";

const BASE_URL = "https://rgs-backend.onrender.com";

const CreateOffers = () => {
  const [activeTab, setActiveTab] = useState("near");
  const [allOffers, setAllOffers] = useState([]); // ✅ store ALL offers
  const [offers, setOffers] = useState([]);       // ✅ filtered offers
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch once
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/offers");
        setAllOffers(res.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // 🔹 Filter when tab OR data changes
  useEffect(() => {
    const filtered =
      activeTab === "near"
        ? allOffers.filter((o) => o.nearYou)
        : allOffers.filter((o) => !o.nearYou);

    setOffers(filtered);
  }, [activeTab, allOffers]);

  // 🔹 Add newly created offer
  const handleCreateOffer = (newOffer) => {
    setAllOffers((prev) => [...prev, newOffer]);
    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-[#FFEDED] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 max-w-3xl mx-auto mt-5">
        <h1 className="text-2xl font-bold">OFFERS</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1 bg-[#E21313] text-white px-3 py-2 rounded-lg"
        >
          <Plus size={18} />
          Create Offer
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto mb-4">
        <div className="w-[210px] flex gap-2 rounded-3xl p-2 bg-black">
          <button
            onClick={() => setActiveTab("near")}
            className={`font-semibold ${activeTab === "near"
                ? "text-black bg-white rounded-3xl px-3 py-1"
                : "text-gray-400"
              }`}
          >
            Near You
          </button>

          <button
            onClick={() => setActiveTab("other")}
            className={`font-semibold ${activeTab === "other"
                ? "text-black bg-white rounded-3xl px-3 py-1"
                : "text-gray-400"
              }`}
          >
            Other Offers
          </button>
        </div>
      </div>

      {/* Offers */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {loading && <p>Loading offers...</p>}
        {!loading && offers.length === 0 && <p>No offers found.</p>}

        {offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
          >
            <div>
              <h2
                className={`text-xl font-bold ${offer.nearYou ? "text-blue-500" : "text-black"
                  }`}
              >
                {offer.discount}% OFF
              </h2>

              <p className="text-gray-500 text-sm mt-3">
                {offer.description}
              </p>
            </div>

            <div className="text-right">
              <img
                src={
                  offer.logo
                    ? offer.logo.startsWith("http")
                      ? offer.logo
                      : `${BASE_URL}${offer.logo}`
                    : "/default-logo.png"
                }
                alt={offer.brandName}
                className="h-10 object-contain mb-1"
              />

              <p className="text-sm font-semibold mt-1">
                CODE: {offer.code}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <CreateOfferModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateOffer}
        />
      )}
    </div>
  );
};

export default CreateOffers;
