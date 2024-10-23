import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { DepartureIcon } from "../icons";

// Define the type for the airport item
export interface AirportItem {
  airport_name: string;
  city_name: string;
  country_name: string;
  airport_code: string;
}

// Define the props type for the component
interface OriginProps {
  origin: string;
  setOrigin: (value: string) => void;
}

export default function Origin({ origin, setOrigin }: OriginProps) {
  let list = useAsyncList<AirportItem>({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/autocomplete-airport/?q=${filterText}`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.results as AirportItem[], // Type-cast to the AirportItem type
      };
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[#868C98] text-small">From</h3>
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Autocomplete
          aria-label="origin"
          inputValue={origin || list.filterText}
          isLoading={list.isLoading}
          items={list.items}
          placeholder="Origin"
          startContent={<DepartureIcon style={{ marginRight: 4 }} />}
          onInputChange={(text) => {
            list.setFilterText(text);
            setOrigin(""); // Clear the selected value when typing
          }}
          onSelectionChange={(key: any) => {
            // Find the selected item and update input value
            const selectedItem = list.items.find(
              (item) => `${item.city_name} (${item.airport_code})` === key
            );

            if (selectedItem) {
              setOrigin(
                `${selectedItem.city_name} (${selectedItem.airport_code})`
              );
            }
          }}
          color="default"
          classNames={{
            base: "w-[200px] h-[40px]",
          }}
        >
          {(item) => (
            <AutocompleteItem
              key={`${item.city_name} (${item.airport_code})`}
              textValue={`${item.city_name} (${item.airport_code})`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex flex-col flex-2">
                  <p>{item.airport_name}</p>
                  <span className="text-gray-500">
                    {item.city_name}, {item.country_name}
                  </span>
                </div>
                <div style={{ alignSelf: "flex-start" }}>
                  <span
                    className="text-white text-xs px-2 py-2 rounded-full"
                    style={{
                      backgroundColor: "#214CE7",
                    }}
                  >
                    {item.airport_code}
                  </span>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
}
