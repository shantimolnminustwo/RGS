 import { useState } from "react";
import api from "../utils/api";

const CreateOfferModal = ({ onClose, onCreate }) => {
  const [logoPreview, setLogoPreview] = useState(null);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append("brandName", e.target.brandName.value);
    formData.append("discount", e.target.discount.value);
    formData.append("code", e.target.code.value);
    formData.append("type", e.target.type.value);
    formData.append("description", e.target.description.value);
    formData.append("note", e.target.note.value);
    formData.append("expiryDate", e.target.expiryDate.value);
    formData.append("address", e.target.address.value);

    // convert type -> nearYou boolean
    const isNearYou = e.target.type.value === "nearYou";
    formData.append("nearYou", isNearYou);

    if (e.target.logo.files[0]) {
      formData.append("logo", e.target.logo.files[0]);
    }

    const token = localStorage.getItem("accessToken");

    try {
      const res = await api.post("/api/offers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Offer created successfully!");
      onCreate(res.data.offer);
      onClose();
    } catch (err) {
      console.error("Error creating offer:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 h-full">
      <form
        onSubmit={handleCreateOffer}
        className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 h-[80vh] overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4">Create Offer</h2>

        <input
          name="brandName"
          placeholder="Brand Name"
          required
          className="w-full border p-2 rounded-lg mb-4"
        />

        <input
          name="discount"
          type="number"
          placeholder="Discount %"
          required
          className="w-full border p-2 rounded-lg mb-4"
        />

        <input
          name="code"
          placeholder="Offer Code"
          required
          className="w-full border p-2 rounded-lg mb-4"
        />

        <select name="type" className="w-full border p-2 rounded-lg mb-4">
          <option value="nearYou">Near You</option>
          <option value="other">Other Offers</option>
        </select>

        <textarea
          name="description"
          placeholder="Offer description"
          className="w-full border p-2 rounded-lg mb-4"
        />

        <textarea
          name="note"
          placeholder="Note (terms & conditions)"
          className="w-full border p-2 rounded-lg mb-4"
        />
        
       <label className="block text-sm font-medium mb-1">
  Expiry Date
</label>

<input
  type="date"
  name="expiryDate"
  min={new Date().toISOString().split("T")[0]}
  required
  className="w-full border p-2 rounded-lg mb-4"
/>


        <input
          name="address"
          placeholder="Shop address (eg: MG Road, Bangalore)"
          required
          className="w-full border p-2 rounded-lg mb-4"
        />

        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full border p-2 rounded-lg mb-2"
        />

        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="w-20 h-20 object-contain mb-4"
          />
        )}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#E21313] text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOfferModal;
