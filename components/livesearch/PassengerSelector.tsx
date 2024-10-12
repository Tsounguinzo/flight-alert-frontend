import React, { useState } from "react";
import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { MdPerson } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { ArrowUpIcon } from "../flights/arrow-up";
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
      onOpenChange={setIsPopoverOpen}
      placement="bottom"
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
                onClick={decrementAdults}
                isIconOnly
                color="danger"
                size="sm"
                variant="bordered"
                isDisabled={adults <= 1}
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
                onClick={incrementAdults}
                isIconOnly
                size="sm"
                color="primary"
                variant="bordered"
                isDisabled={adults >= 9}
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
                onClick={decrementChildren}
                size="sm"
                isIconOnly
                color="danger"
                variant="bordered"
                isDisabled={children <= 0}
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
                onClick={incrementChildren}
                size="sm"
                variant="bordered"
                color="primary"
                isIconOnly
                isDisabled={children >= 9}
              >
                <IoIosAdd />
              </Button>
            </div>
          </div>
          {/* Done Button */}
          <Button
            onClick={() => {
              setIsPopoverOpen(false);
            }}
            variant="flat"
            fullWidth
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerSelector;
