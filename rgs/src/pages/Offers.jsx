import { Menu } from "lucide-react";
import { CiBookmark } from "react-icons/ci";
import { HiMiniBookmark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
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

const OfferCard = ({ discount, brand, code, logo, id, variant = "red" }) => {
    const navigate = useNavigate();
    const colors = colorMap[variant];

    const handleClick = () => {
        navigate(`/offers/${id}`, {
            state: { discount, brand, code, logo, variant },
        });
    };

    return (
        <div onClick={handleClick} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
            <div>
                <h3 className={`text-2xl font-poppins font-bold ${colors.discount}`}>
                    {discount} OFF
                </h3>
                <p className="text-base text-[#888888]">Grab your offer now</p>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center relative">
                    <img src={logo} alt={brand} className="h-[5vh] object-contain" />
                    <HiMiniBookmark
                        className={`absolute top-0 right-0 ${colors.bookmark}`}
                        size={20}
                    />
                </div>

                <p className={`text-sm font-bold ${colors.code}`}>
                    CODE: <span className="font-bold">{code}</span>
                </p>
            </div>
        </div>
    );
};

const Offers = () => {
    return (
        <div className="w-full min-h-screen bg-[#FFEDED] font-poppins p-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">OFFERS</h1>
                    <div className=" flex items-center gap-3">
                        <img src="/refresh.svg" alt="refresh icon" className="w-6 h-6" />
                        <Menu size={24} />
                    </div>
                </div>

                {/* Top Offers */}
                <div className="space-y-4">
                    <OfferCard
                        id="kfc-1"
                        discount="25%"
                        brand="KFC"
                        code="KUB123"
                        logo="/kub.svg"
                    />
                    <OfferCard
                        id="kfc-2"
                        discount="25%"
                        brand="KFC"
                        code="KUB123"
                        logo="/kub.svg"
                    />
                </div>

                {/* Near You */}
                <h2 className="mt-8 mb-3 text-lg font-bold text-[#555353]">
                    Near you
                </h2>

                <div className="space-y-4">
                    <OfferCard
                        id="sign-1"
                        discount="50%"
                        brand="Sign Baba"
                        code="SIG123"
                        logo="/sign.svg"
                        variant="blue"
                    />
                    <OfferCard
                        id="sign-2"
                        discount="50%"
                        brand="Sign Baba"
                        code="SIG123"
                        logo="/sign.svg"
                        variant="blue"
                    />

                </div>

                {/* Other Offers */}
                <h2 className="mt-8 mb-3 text-lg font-bold text-[#555353]">
                    Other Offers
                </h2>
                <div className="space-y-4">
                    <OfferCard
                        id="puma-1"
                        discount="50%"
                        brand="Puma"
                        code="PUM123"
                        logo="/puma.svg"
                        variant="black"
                    />

                </div>
            </div>
        </div>
    );
};

export default Offers;
