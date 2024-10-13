import sampleFlights from "@/data/sample-flights.json";

type Offer = {
  tripLength?: number; // For global offers
  startDate: string;
  returnDate: string;
  price: number;
  link?: string; // Optional initially, can be set later
};

type FlightCategory = {
  value: Offer[];
  cheapestOffer: {
    indices: number[];
    links: Record<number, string>;
    price: number;
  };
};

export type FlightData = {
  globalCheapestOffers: {
    offers: Offer[]; // Global offers
    price: number; // Price of the global cheapest offer
  };
  [tripLength: `tripLength_${number}`]: FlightCategory; // Dynamic trip lengths (e.g., tripLength_5, tripLength_10)
};

export type Flight = {
  id: string;
  startDate: Date;
  returnDate: Date;
  departingAirport: string;
  returningAirport: string;
  stay: number;
  price: number;
  link?: string;
};

export type ColumnsKey =
  | "startDate"
  | "returnDate"
  | "departingAirport"
  | "returningAirport"
  | "stay"
  | "price"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "startDate",
  "returnDate",
  "departingAirport",
  "returningAirport",
  "price",
  "stay",
  "actions",
];

export const columns = [
  { name: "Departure Date", uid: "startDate" },
  {
    name: "Return Date",
    uid: "returnDate",
    info: "Day of the flight from departure airport",
  },
  {
    name: "Stay",
    uid: "stay",
    info: "Number of days",
  },
  {
    name: "Departing Airport",
    uid: "departingAirport",
    sortDirection: "ascending",
  },
  {
    name: "Returning Airport",
    uid: "returningAirport",
    sortDirection: "ascending",
  },
  { name: "Price", uid: "price", sortDirection: "ascending" },
  { name: "Actions", uid: "actions" },
];

export function convertFlightsToTableData(
  flightData: FlightData,
  departingAirport: string,
  returningAirport: string,
): Flight[] {
  const flights: Flight[] = [];

  for (const tripLengthKey in flightData) {
    if (tripLengthKey === "globalCheapestOffers") continue; // Skip global offers

    const flightCategory = flightData[
      tripLengthKey as keyof FlightData
    ] as FlightCategory;

    const tripLength = parseInt(tripLengthKey.split("_")[1]);

    const linksMap = flightCategory.cheapestOffer.links;

    const mappedFlights = flightCategory.value.map((offer, index) => ({
      startDate: new Date(offer.startDate),
      returnDate: new Date(offer.returnDate),
      price: offer.price,
      id: `${tripLength}_${index}`,
      departingAirport: departingAirport,
      returningAirport: returningAirport,
      stay: tripLength,
      link: linksMap[index] || undefined,
    }));

    flights.push(...mappedFlights);
  }

  return flights;
}

const generateMockFlightData = (flightData: FlightData) => {
  return convertFlightsToTableData(flightData, "JFK", "LAX");
};

export const flights: Flight[] = generateMockFlightData(
  sampleFlights as FlightData,
);
