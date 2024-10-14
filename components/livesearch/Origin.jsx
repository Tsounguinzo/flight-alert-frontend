import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";

export default function Origin({ origin, setOrigin }) {
  let list = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/autocomplete-airport/?q=${filterText}`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      inputValue={origin || list.filterText}
      isLoading={list.isLoading}
      aria-label="origin"
      items={list.items}
      placeholder="Where from?"
      startContent={<FaPlaneDeparture style={{ marginRight: 4 }} />}
      onInputChange={(text) => {
        list.setFilterText(text);
        setOrigin(""); // clear the selected value when typing
      }}
      onSelectionChange={(key) => {
        // Find the selected item and update input value
        const selectedItem = list.items.find(
          (item) => `${item.city_name} (${item.airport_code})` === key
        );
        if (selectedItem) {
          setOrigin(`${selectedItem.city_name} (${selectedItem.airport_code})`);
        }
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
                style={{
                  backgroundColor: "#214CE7",
                }}
                className="text-white text-xs px-2 py-1 rounded-full"
              >
                {item.airport_code}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
