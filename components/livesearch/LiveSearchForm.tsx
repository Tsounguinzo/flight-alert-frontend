import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

import PassengerSelector from "./PassengerSelector";
import Origin from "./Origin";
import Destination from "./Destination";

function LiveSearchForm() {
  const [origin, setOrigin] = useState(""); // State for origin
  const [destination, setDestination] = useState(""); // State for destination
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
  const handleOriginChange = (selected: string) => {
    setOrigin(selected);
  };

  const handleDestinationChange = (selected: string) => {
    setDestination(selected);
  };

  const handleSwap = () => {
    console.log(destination);
    console.log(origin);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 w-full">
        <Select
          aria-label="type"
          className="max-w-[33%]"
          defaultSelectedKeys={["Round Trip"]}
          radius={"sm"}
        >
          {flightTypes.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
        <PassengerSelector />
        <Select
          aria-label="class"
          className="max-w-[33%]"
          defaultSelectedKeys={["Economy"]}
          radius={"sm"}
        >
          {flightClass.map((fCalss) => (
            <SelectItem key={fCalss.key}>{fCalss.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-3 w-full">
        <div>
          <Origin origin={origin} onChange={handleOriginChange} />
        </div>
        <Button isIconOnly onClick={handleSwap}>
          <AiOutlineSwap />
        </Button>
        <div>
          <Destination
            destination={destination}
            onChange={handleDestinationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default LiveSearchForm;
