"use client";
import React from "react";
import { Button } from "@nextui-org/react";

import Deal from "./Deal";

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
            key={"CARD1"}
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            imageUrl="/deal.jpg"
            price="12000"
          />
          <Deal
            key={"CARD2"}
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            imageUrl="/deal.jpg"
            price="12000"
          />
          <Deal
            key={"CARD3"}
            city="Bston, MA"
            dates="We 11 Sep - Fr 20 Sep"
            from="EWN"
            imageUrl="/deal.jpg"
            price="12000"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <Button
          className="xs:inline-flex text-white"
          size="lg"
          style={{
            backgroundColor: "#457EFF",
          }}
        >
          View All Deals
        </Button>
      </div>
    </section>
  );
}

export default Deals;
