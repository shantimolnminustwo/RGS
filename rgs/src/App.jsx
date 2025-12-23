import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import OfferDetails from "./pages/OfferDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:id" element={<OfferDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
