import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import PassengerSelector from "./PassengerSelector";
import Origin from "./Origin";
import Destination from "./Destination";

function LiveSearchForm() {
  const flightTypes = [
    { label: "Round Trip", key: "Round Trip" },
    { label: "One Way", key: "One Way" },
    { label: "Miles", key: "Miles" },
  ];
  const flightClass = [
    { label: "Economy", key: "Economy" },
    { label: "Premium", key: "Premium" },
    { label: "Business", key: "Business" },
    { label: "First", key: "First" },
  ];
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 w-full">
        <Select
          aria-label="type"
          radius={"sm"}
          defaultSelectedKeys={["Round Trip"]}
          className="max-w-[33%]"
        >
          {flightTypes.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
        <PassengerSelector />
        <Select
          aria-label="class"
          radius={"sm"}
          defaultSelectedKeys={["Economy"]}
          className="max-w-[33%]"
        >
          {flightClass.map((fCalss) => (
            <SelectItem key={fCalss.key}>{fCalss.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-3 w-full">
        <div>
          <Origin />
        </div>
        <div>
          <Destination />
        </div>
      </div>
    </div>
  );
}

export default LiveSearchForm;
