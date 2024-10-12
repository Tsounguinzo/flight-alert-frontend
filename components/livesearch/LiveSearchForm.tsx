import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import PassengerSelector from "./PassengerSelector";

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
    <div>
      <div className="flex items-center gap-3">
        <Select
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
          radius={"sm"}
          defaultSelectedKeys={["Economy"]}
          className="max-w-[33%]"
        >
          {flightClass.map((fCalss) => (
            <SelectItem key={fCalss.key}>{fCalss.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default LiveSearchForm;
