"use client";

import Greeting from "@/components/dashboard/Greeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import { MdEmergency } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiMentalHealthFill } from "react-icons/ri";
import { HiChatBubbleBottomCenterText, HiUserGroup } from "react-icons/hi2";
import { GiCupcake } from "react-icons/gi";
import { MdFactCheck } from "react-icons/md";
import Link from "next/link";
import { useLocation } from "@/hooks/useLocation";
import LocationButton from "@/components/LocationButton";

export default function Dashboard() {
  function sendSOSMessage() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `Emergency! My location: https://maps.google.com/?q=${latitude},${longitude}`;
          const phoneNumber = "9511228761";

          window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
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

  const { location, getLiveLocation } = useLocation();

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
    { color: "amber", label: "Send Location", href: "#", icon: MdEmergency, action: sendSOSMessage },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-4">
      <div className="sticky top-16 bg-white z-10 w-full">
        <Greeting userFirstName={userFirstName} />
        <hr className="w-full opacity-20" />
      </div>

      {/* Header */}
      <div className="flex my-4 w-full justify-center items-center text-center">
        <div className="text-base font-semibold text-[#DB6542]">
          What Would You Like <span className="text-[#389F8A]"> to do Today?</span>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
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
      {React.createElement(data.icon, { className: `w-8 h-8 fill-${data.color}-900` })}
      <span className="font-semibold text-center">{data.label}</span>
    </button>
  ) : (
    <Link href={data.href}>
      <div
        className={`w-full aspect-square rounded-md flex flex-col justify-center items-center shadow-md gap-1 bg-gradient-to-br from-${data.color}-100 to-${data.color}-200 text-${data.color}-950`}
      >
        {React.createElement(data.icon, { className: `w-8 h-8 fill-${data.color}-900` })}
        <span className="font-semibold text-center">{data.label}</span>
      </div>
    </Link>
  );
}
