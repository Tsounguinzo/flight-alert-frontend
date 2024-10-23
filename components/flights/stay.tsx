import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FaClock } from "react-icons/fa";

import { ArrowDown, ArrowUp } from "@/components/icons";
import RangeSlider, {
  RangeSliderPipProps,
} from "@/components/flights/range-slider";
import { RangeValue } from "@/components/flights/index";

export type StaySelectorProps = RangeSliderPipProps & {
  value: RangeValue;
  setValue: (value: RangeValue) => void;
};

const StaySelector = (props: StaySelectorProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      placement="bottom"
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger>
        <Button
          className="w-full h-[58px]"
          radius="sm"
          style={{ backgroundColor: "#F4F4F5" }}
        >
          <div className="flex items-center gap-3">
            <FaClock className="text-default-400" size={20} />
            <p>{`${props.value[0]} - ${props.value[1]}`}</p>
            <div>{isPopoverOpen ? <ArrowUp /> : <ArrowDown />}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4 select-none">
          <RangeSlider
            aria-label="Stay Filter"
            range={{
              min: 1,
              defaultValue: [12, 15],
              max: 60,
              step: 1,
            }}
            {...props}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StaySelector;
