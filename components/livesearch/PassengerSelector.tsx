import React, { useState } from "react";
import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { MdPerson } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineMinusSmall } from "react-icons/hi2";

import { ArrowDown, ArrowUp } from "../icons";

const PassengerSelector = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const totalPassengers = adults + children;

  const incrementAdults = () => {
    if (adults < 9) setAdults(adults + 1);
  };

  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => {
    if (children < 9) setChildren(children + 1);
  };

  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      placement="bottom"
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger>
        <Button radius="sm" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="flex items-center gap-3">
            <MdPerson size={20} />
            <p>{totalPassengers}</p>
            <div>{isPopoverOpen ? <ArrowUp /> : <ArrowDown />}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4 select-none">
          <div className="flex justify-between items-center mb-4 gap-5">
            <div>
              <p>Adults </p>
              <span className="text-xs text-gray-400">Aged (12+)</span>
            </div>
            <div className="flex items-center">
              <Button
                isIconOnly
                color="danger"
                isDisabled={adults <= 1}
                size="sm"
                variant="bordered"
                onClick={decrementAdults}
              >
                <HiOutlineMinusSmall />
              </Button>
              <p
                className="mx-4"
                style={{ width: "20px", textAlign: "center" }}
              >
                {adults}
              </p>{" "}
              <Button
                isIconOnly
                color="primary"
                isDisabled={adults >= 9}
                size="sm"
                variant="bordered"
                onClick={incrementAdults}
              >
                <IoIosAdd />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 gap-5">
            <div>
              <p>Children</p>
              <span className="text-xs text-gray-400">Aged (2-11)</span>
            </div>
            <div className="flex items-center">
              <Button
                isIconOnly
                color="danger"
                isDisabled={children <= 0}
                size="sm"
                variant="bordered"
                onClick={decrementChildren}
              >
                <HiOutlineMinusSmall />
              </Button>
              <p
                className="mx-4"
                style={{ width: "20px", textAlign: "center" }}
              >
                {children}
              </p>
              <Button
                isIconOnly
                color="primary"
                isDisabled={children >= 9}
                size="sm"
                variant="bordered"
                onClick={incrementChildren}
              >
                <IoIosAdd />
              </Button>
            </div>
          </div>
          {/* Done Button */}
          <Button
            fullWidth
            variant="flat"
            onClick={() => {
              setIsPopoverOpen(false);
            }}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerSelector;
