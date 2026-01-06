 import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CreateOfferModal from "./CreateOfferModal";
import api from "../utils/api";

const CreateOffers = () => {
  const [activeTab, setActiveTab] = useState("near");
  const [offers, setOffers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/offers");
        const filtered = res.data.filter((o) =>
          activeTab === "near" ? o.nearYou : !o.nearYou
        );
        setOffers(filtered);
      } catch (err) {
        console.error("Error fetching offers:", err);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [activeTab]);

  const handleCreateOffer = (newOffer) => {
    const matchesTab =
      activeTab === "near" ? newOffer.nearYou : !newOffer.nearYou;

    if (matchesTab) {
      setOffers((prev) => [...prev, newOffer]);
    }

    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-[#FFEDED] p-4">
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

      <div className="max-w-3xl mx-auto mb-4">
        <div className="w-[210px] flex gap-2 rounded-3xl p-2 bg-black">
          <button
            onClick={() => setActiveTab("near")}
            className={`font-semibold ${
              activeTab === "near"
                ? "text-black bg-white rounded-3xl px-3 py-1"
                : "text-gray-400"
            }`}
          >
            Near You
          </button>

          <button
            onClick={() => setActiveTab("other")}
            className={`font-semibold ${
              activeTab === "other"
                ? "text-black bg-white rounded-3xl px-3 py-1"
                : "text-gray-400"
            }`}
          >
            Other Offers
          </button>
        </div>
      </div>

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
                className={`text-xl font-bold ${
                  activeTab === "near" ? "text-blue-500" : "text-black"
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
                    ? offer.logo.startsWith("/uploads")
                      ? `http://localhost:5000${offer.logo}`
                      : offer.logo
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
