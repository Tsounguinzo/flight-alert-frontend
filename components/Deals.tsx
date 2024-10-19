"use client";
import React from "react";
import Deal from "./Deal";
import { Button } from "@nextui-org/react";

function Deals() {
  return (
    <section
      className="w-full py-16"
      style={{
        background: "#E8EBED",
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 py-12">
        <h2 className="text-3xl text-center mb-8 text-black">Our Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Deal
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            price="12000"
            key={"CARD1"}
            imageUrl="/deal.jpg"
          />
          <Deal
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            price="12000"
            key={"CARD2"}
            imageUrl="/deal.jpg"
          />
          <Deal
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            price="12000"
            key={"CARD3"}
            imageUrl="/deal.jpg"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <Button
          className="xs:inline-flex text-white"
          style={{
            backgroundColor: "#457EFF",
          }}
          size="lg"
        >
          View All Deals
        </Button>
      </div>
    </section>
  );
}

export default Deals;
