"use client";
import { useLocation } from "../hooks/useLocation";

function LocationButton() {
    console.log("LocationButton Loaded");
    const { location, getLiveLocation } = useLocation();

    console.log("Current Location:", location); // ✅ Debugging Step

    return (
        <div>
            <button
                onClick={getLiveLocation}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Share Live Location
            </button>
            {location && (
                <p>Location: {location.latitude}, {location.longitude}</p>
            )}
        </div>
    );
}
export default LocationButton;