 import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const AddressMap = ({ address }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address) return;

    const fetchLocation = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`,
          {
            headers: {
              "Accept": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!data || data.length === 0) {
          setError("Location not found");
          return;
        }

        setPosition([
          parseFloat(data[0].lat),
          parseFloat(data[0].lon),
        ]);
      } catch (err) {
        console.error("Map geocode error:", err);
        setError("Failed to load map");
      }
    };

    fetchLocation();
  }, [address]);

  if (error) return <p className="text-red-500">{error}</p>;

  if (!position)
    return <p className="text-gray-500">Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "300px", width: "100%" }}
      className="rounded-xl mb-6"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default AddressMap;
