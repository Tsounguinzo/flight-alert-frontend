"use client";
import React from "react";
import { CalendarIcon } from "./icons";

export default function Deal({
  city,
  price,
  dates,
  from,
  imageUrl,
}: {
  city: string;
  price: string;
  dates: string;
  from: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm relative">
      <div className="relative">
        <img src={imageUrl} alt={city} className="w-full h-48 object-cover" />
        <div className="absolute flex items-center gap-2 bg-[#6896FF] top-4 right-4 text-white text-sm font-semibold px-3 py-2 rounded-lg">
          <CalendarIcon />
          <span>{dates}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-800">{city}</h3>
            <p className="text-gray-500 text-sm">from {from}</p>
          </div>
          <p className="text-blue-600 text-2xl font-bold">${price}</p>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button className="w-full text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
