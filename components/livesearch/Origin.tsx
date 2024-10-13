import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { FaPlaneDeparture } from "react-icons/fa";

import airportsData from "@/data/airport-data";

interface OriginProps {
  onChange: (item: string) => void;
  origin: string; // Allow origin to be null initially
}
export default function Origin({ onChange, origin }: OriginProps) {
  const handleSelect = (item: any) => {
    console.log(item);
    onChange(item); // Pass the selected value to the parent
  };

  return (
    <Autocomplete
      aria-label="Select an origin"
      classNames={{
        base: "max-w-xs",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500",
      }}
      defaultItems={airportsData}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      placeholder="Where from?"
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-sm",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      radius="sm"
      selectedKey={origin} // Set value based on origin
      startContent={<FaPlaneDeparture />}
      onSelectionChange={handleSelect}
    >
      {(item: { airportCode: string; cityName: string }) => (
        <AutocompleteItem
          key={`${item.cityName} (${item.airportCode})`}
          textValue={`${item.cityName} (${item.airportCode})`}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{item.airportCode}</span>
                <span className="text-tiny text-default-400">
                  {item.cityName}
                </span>
              </div>
            </div>
            <Button
              className="border-small mr-0.5 font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
