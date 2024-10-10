"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const FlightAlertType = () => {
  const [activeTab, setActiveTab] = useState("Whatsapp");

  return (
    <div className="inline-flex rounded-full border-2 border-foreground p-1">
      <Button
        className={`rounded-full px-4 py-2 flex items-center ${
          activeTab === "Whatsapp"
            ? "bg-foreground text-white"
            : "bg-transparent text-gray-800"
        }`}
        onPress={() => setActiveTab("Whatsapp")}
      >
        <FaWhatsapp size={20} />
        Whatsapp
      </Button>
      <Button
        className={`rounded-full px-4 py-2 flex items-center ${
          activeTab === "Email"
            ? "bg-foreground text-white"
            : "bg-transparent text-gray-800"
        }`}
        onPress={() => setActiveTab("Email")}
      >
        <MdOutlineEmail size={20} />
        Email
      </Button>
    </div>
  );
};

export default function TrackerBanner() {
  return (
    <div className="p-8 border border-foreground rounded-lg shadow-md w-full">
      <div className="mb-6">
        <h2 className="text-4xl font-light mb-8 uppercase">TRAVEL WITH US</h2>
        <h1 className="text-5xl font-light mb-4 uppercase">
          {" "}
          <span className="font-bold">DISCOVER</span> THE WORLD
        </h1>
        <div className="flex space-x-2 mb-6">
          <FlightAlertType />
        </div>
      </div>

      <div className="bg-foreground p-1 rounded-md w-full h-full flex gap-1">
        <Input
          classNames={{ inputWrapper: "bg-background", input: "text-lg" }}
          label={"Email"}
        />
        <div className="w-1/3">
          <button className="bg-foreground text-white rounded-lg w-full h-full hover:scale-125">
            Start tracking
          </button>
        </div>
      </div>
    </div>
  );
}
