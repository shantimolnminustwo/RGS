 import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import OfferDetails from "./pages/OfferDetails";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import RedeemedOffers from "./pages/RedeemedOffers";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:id" element={<OfferDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/redeemed-offers" element={<RedeemedOffers />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
