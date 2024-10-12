export type Flight = {
  id: number;
  departureDate: Date;
  returnDate: Date;
  departingAirport: string;
  returningAirport: string;
  stay: number;
  price: number;
};

export type ColumnsKey =
  | "departureDate"
  | "returnDate"
  | "departingAirport"
  | "returningAirport"
  | "stay"
  | "price"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "departureDate",
  "returnDate",
  "departingAirport",
  "returningAirport",
  "price",
  "stay",
  "actions",
];

export const columns = [
  { name: "Departure Date", uid: "departureDate" },
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

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function getRandomAirport(): string {
  const airports = [
    "JFK",
    "LAX",
    "ORD",
    "ATL",
    "SFO",
    "CDG",
    "LHR",
    "AMS",
    "HND",
    "DXB",
  ];

  return airports[Math.floor(Math.random() * airports.length)];
}

function getRandomPrice(min: number = 100, max: number = 2000): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateMockFlightData = (count: number): Flight[] => {
  const mockData: Flight[] = [];

  for (let i = 0; i < count; i++) {
    const departureDate = getRandomDate(
      new Date(2024, 0, 1),
      new Date(2025, 0, 1),
    );
    const returnDate = getRandomDate(
      new Date(departureDate),
      new Date(2025, 0, 1),
    );

    const flight: Flight = {
      id: i,
      departureDate: departureDate,
      stay: Math.floor(
        (returnDate.getTime() - departureDate.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
      returnDate: returnDate,
      departingAirport: getRandomAirport(),
      returningAirport: getRandomAirport(),
      price: getRandomPrice(),
    };

    mockData.push(flight);
  }

  return mockData;
};

export const flights: Flight[] = generateMockFlightData(100);
