import { redirect } from "next/navigation";

export default function HomeRedirect() {
  redirect("/dashboard");
}

// import LocationButton from "../components/LocationButton";

// async function sendLocationSMS(phoneNumber, latitude, longitude) {
//     const response = await fetch("/api/sendSMS", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, latitude, longitude })
//     });

//     const data = await response.json();
//     if (data.success) {
//         console.log("SMS Sent Successfully!");
//     } else {
//         console.error("Error sending SMS:", data.error);
//     }
// }

// export default function Home() {
//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-2xl font-bold">Live Location Sharing</h1>
//             <LocationButton />
//             <button 
//                 onClick={() => sendLocationSMS("+1234567890", 28.6139, 77.2090)} 
//                 className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
//             >
//                 Send Location SMS
//             </button>
//         </div>
//     );
// }
