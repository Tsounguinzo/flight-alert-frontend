import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

import PassengerSelector from "./PassengerSelector";
import Origin from "./Origin";
import Destination from "./Destination";

function LiveSearchForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

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

  const handleSwap = () => {
    const x = origin;
    const y = destination;

    setOrigin(y);
    setDestination(x);
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
          {flightClass.map((fClass) => (
            <SelectItem key={fClass.key}>{fClass.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-3 w-full">
        {/* Origin Autocomplete */}
        <Origin origin={origin} setOrigin={setOrigin} />
        {/* Swap Button */}
        <Button
          isIconOnly
          style={{ backgroundColor: "#F4F4F5" }}
          onClick={handleSwap}
        >
          <AiOutlineSwap />
        </Button>
        {/* Destination Autocomplete */}
        <Destination
          destination={destination}
          setDestination={setDestination}
        />
      </div>
    </div>
  );
}

export default LiveSearchForm;
