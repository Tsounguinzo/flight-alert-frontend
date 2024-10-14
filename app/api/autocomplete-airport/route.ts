import { NextRequest, NextResponse } from "next/server";

import airportsData from "@/data/airports.json";

export async function GET(request: NextRequest) {
  try {
    // Get the search query and limit from the request URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (query.length < 3) {
      return NextResponse.json({ count: 0, results: [] });
    }

    // Filter the airports data based on the query and format it as "City Name (Airport Code)"
    const filteredAirports = airportsData.filter(
      (airport) =>
        airport.city_name.toLowerCase().includes(query) ||
        airport.airport_code.toLowerCase().includes(query),
    );

    // Return the filtered and formatted results as a JSON response
    return NextResponse.json({
      count: filteredAirports.length,
      results: filteredAirports,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
