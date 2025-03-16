"use client"; 

import { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export function useLocation() {
    const [location, setLocation] = useState(null);

    if (typeof window === "undefined") {
        return { location: null, getLiveLocation: () => {} };
    }

    const getLiveLocation = () => {
        if ("geolocation" in navigator) {  // ✅ Ensures geolocation exists
            navigator.geolocation.getCurrentPosition(async (position) => {
                const locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: new Date().toISOString()
                };
                setLocation(locationData);
                await saveLocationToFirestore(locationData);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };
    const saveLocationToFirestore = async (locationData) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User not authenticated");
                return;
            }
            const userDocRef = doc(db, "locations", user.uid);
            await setDoc(userDocRef, locationData, { merge: true });
            console.log("Location saved to Firestore");
        } catch (error) {
            console.error("Error saving location:", error);
        }
    };
    

    return { location, getLiveLocation };
}
