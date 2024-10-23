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

    const tripLength = parseInt(tripLengthKey.split("_")[2]);

    const linksMap = flightCategory.cheapestOffer.links;

    if (!flightCategory.value?.length) continue;

    const mappedFlights = flightCategory.value.map((offer, index) => ({
      startDate: new Date(
        new Date(offer.startDate).setDate(
          new Date(offer.startDate).getDate() + 1,
        ),
      ),
      returnDate: new Date(
        new Date(offer.returnDate).setDate(
          new Date(offer.returnDate).getDate() + 1,
        ),
      ),
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
