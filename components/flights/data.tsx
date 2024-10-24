export type FlightData = {
  offers: Offer[];
  parameters: Parameters;
  usage: number;
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

export type Offer = {
  startDate: Date;
  returnDate: Date;
  price: number;
  tripLength: number;
  deal?: boolean;
};

export type Parameters = {
  origin: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  minTripLength: number;
  maxTripLength: number;
  maxFlightDuration: number;
  maxLayoverMinutes: number;
  excludedAirlines: string;
  excludedAirports: string;
  stops: number;
  travelClass: string;
  tripType: string;
  numAdults: number;
  numChildren: number;
  currencyCode: string;
  avoidUStops: boolean;
};

export function convertFlightsToTableData(flightData: FlightData): Flight[] {
  const flights: Flight[] = [];

  for (let i = 0; i < flightData.offers.length; i++) {
    const offer = flightData.offers[i];
    const flight: Flight = {
      id: `${offer.tripLength}_${i}`,
      startDate: offer.startDate,
      returnDate: offer.returnDate,
      departingAirport: flightData.parameters.origin,
      returningAirport: flightData.parameters.destination,
      stay: offer.tripLength,
      price: offer.price,
    };

    flights.push(flight);
  }

  return flights;
}
