import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon
import L from "leaflet";
const DefaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to update map center when "center" changes
function MapCenterUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  map.flyTo(center, map.getZoom(), {
    animate: true,
    duration: 0.8,
  });
  return null;
}

// Component to capture clicks on map
function MapClickHandler({
  onSelect,
}: {
  onSelect: (coords: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function Mappa() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>([
    41.9028, 12.4964,
  ]); // Roma
  const [selectedPoint, setSelectedPoint] = useState<
    [number, number] | null
  >(null);

  // Search city with Nominatim
  const searchCity = async (query: string) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleCitySelect = (item: any) => {
    const newCenter: [number, number] = [
      parseFloat(item.lat),
      parseFloat(item.lon),
    ];

    setCenter(newCenter);
    setSelectedPoint(newCenter); // optional: place marker on center
    setCity(item.display_name);
    setSuggestions([]);
  };

  return (
    <div className="p-4 space-y-4">

      {/* CITY INPUT */}
      <div className="relative">
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.length > 2)
              searchCity(e.target.value);
          }}
          placeholder="Inserisci città"
          className="w-full border p-2 rounded"
        />

        {/* DROPDOWN SUGGESTION LIST */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border rounded mt-1 w-full max-h-60 overflow-auto z-50 shadow-lg">
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                onClick={() => handleCitySelect(item)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* MAP WRAPPER to avoid z-index issues */}
      <div className="relative z-0">
        <MapContainer
          center={center}
          zoom={13}
          className="z-0"
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* update map when center changes */}
          <MapCenterUpdater center={center} />

          {/* map click handler */}
          <MapClickHandler
            onSelect={(coords) => setSelectedPoint(coords)}
          />

          {/* marker */}
          {selectedPoint && <Marker position={selectedPoint} />}
        </MapContainer>
      </div>

      {/* COORDINATES OUTPUT */}
      {selectedPoint && (
        <div className="p-3 bg-gray-100 rounded">
          <p>
            <strong>Latitudine:</strong> {selectedPoint[0]}
          </p>
          <p>
            <strong>Longitudine:</strong> {selectedPoint[1]}
          </p>
        </div>
      )}
    </div>
  );
}
