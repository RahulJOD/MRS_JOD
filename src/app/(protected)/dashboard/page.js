"use client";

import Greeting from "@/components/dashboard/Greeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import { MdEmergency, MdWaterDrop } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiMentalHealthFill } from "react-icons/ri";
import { HiChatBubbleBottomCenterText, HiUserGroup } from "react-icons/hi2";
import { GiCupcake } from "react-icons/gi";
import { MdFactCheck } from "react-icons/md";
import Link from "next/link";
import { useLocation } from "@/hooks/useLocation"; // ✅ Correct Path
 // ✅ Correct path
import LocationButton from "@/components/LocationButton"; // ✅ Correct Path



export default function Dashboard() {

  function sendSOSMessage() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `Emergency! My location: https://maps.google.com/?q=${latitude},${longitude}`;
          const phoneNumber = "9511228761"; // Replace with the actual phone number

          // Open SMS app with prefilled message
          window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(
            message
          )}`;
        },
        (error) => {
          alert("Failed to get location. Please enable location services.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported on this device.");
    }
  }
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(" ")[0] : "";

  const { location, getLiveLocation } = useLocation(); // ✅ Call useLocation

  const menuItems = [
    { color: "rose", label: "Medical Emergency", href: "/medicalsNearMe", icon: MdEmergency },
    { color: "amber", label: "Notes", href: "/journal", icon: FaBookOpen },
    { color: "emerald", label: "Fact Check", href: "/fact-check", icon: MdFactCheck },
    { color: "fuchsia", label: "Knowledge", href: "/knowledge", icon: RiMentalHealthFill },
    { color: "orange", label: "Safety Techniques", href: "/social", icon: HiUserGroup },
    { color: "sky", label: "SHE-SAFE", href: "/chat", icon: HiChatBubbleBottomCenterText },
    { color: "green", label: "HelpLine", href: "/safety", icon: AiFillSafetyCertificate },
    { color: "pink", label: "Threats", href: "/emergency", icon: MdEmergency },
    { color: "cyan", label: "dessert", href: "https://www.swiggy.com/desserts-restaurants-near-me", icon: GiCupcake },
    { color: "amber",label: "Send Location",href: "#", icon: MdEmergency, action: sendSOSMessage },
  ];

  return (
    <div className="relative">
      <div className="sticky top-16 bg-white z-10">
        <Greeting userFirstName={userFirstName} />
        <hr className="w-full opacity-20" />
      </div>

      {/* wwyltdt hero */}
      <div className="flex my-4">
        <div className="w-6/12 text-center flex flex-col justify-center items-center text-base font-semibold translate-x-8 text-[#DB6542]">
          What Would You Like
          <span className="text-[#389F8A]"> to do Today?</span>
        </div>
        <div className="w-6/12 overflow-hidden">
          <Image src={"/assets/dashboard/think.png"} width={998} height={622} className="translate-x-10" />
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <GridElement key={item.label} data={item} />
        ))}
      </div>

    </div>
  );
}

function GridElement({ data }) {
  return data.action ? (
    <button
      onClick={data.action}
      className={`w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-md gap-1 bg-gradient-to-br from-${data.color}-100 to-${data.color}-200 text-${data.color}-950`}
    >
      {React.createElement(data.icon, {
        className: `w-1/2 h-1/3 fill-${data.color}-900`,
      })}
      <span className="font-semibold">{data.label}</span>
    </button>
  ) : (
    <Link href={data.href}>
      <div
        className={`w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-md gap-1 bg-gradient-to-br from-${data.color}-100 to-${data.color}-200 text-${data.color}-950`}
      >
        {React.createElement(data.icon, {
          className: `w-1/2 h-1/3 fill-${data.color}-900`,
        })}
        <span className="font-semibold">{data.label}</span>
      </div>
    </Link>
  );
}

console.log("LocationButton:", LocationButton);

console.log("Rendering LocationButton in Dashboard");