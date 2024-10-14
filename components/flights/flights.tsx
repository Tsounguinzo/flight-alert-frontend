"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Input, Button, Select, SelectItem, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ColDef } from "ag-grid-community";

import { convertFlightsToTableData } from "./data";
import { Flight } from "./data";

const FlightsComponent = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    minTripLength: "",
    maxTripLength: "",
    maxFlightDuration: "",
    maxLayoverMinutes: "",
    excludedAirlines: "",
    excludedAirports: "",
    numAdults: 1,
    numChildren: 0,
    stops: "",
    cabin: "Economy",
    tripType: "RoundTrip",
    currencyCode: "USD",
  });

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noFlightsMessage, setNoFlightsMessage] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (e: { target: { value: any; }; }) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const dateFormatter = (params: { value: string | number | Date }) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(params.value));
  };

  const priceFormatter = (params: { value: string | number | Date }) => {
    return `${Number(params.value).toFixed(2)} ${formData.currencyCode}`;
  };

  const stayFormatter = (params: { value: string | number | Date }) => {
    return `${params.value} days`;
  };

  const columnDefs: ColDef<Flight>[] = [
    {
      field: "startDate",
      headerName: "Departure",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: dateFormatter,
    },
    {
      field: "returnDate",
      headerName: "Return",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: dateFormatter,
    },
    {
      field: "stay",
      headerName: "Stay",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: stayFormatter,
    },
    {
      field: "departingAirport",
      headerName: "From",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "returningAirport",
      headerName: "To",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: priceFormatter,
    },
    {
      headerName: "Book",
      sortable: false,
      cellRenderer: (params: any) => (
          <Button
              as={Link}
              href={params.data.link || "#"}
              target="_blank"
              size="sm"
          >
            Book Now
          </Button>
      ),
    },
  ];

  const handleSearch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setNoFlightsMessage("");

    if (!formData.origin || !formData.destination || !formData.startDate || !formData.endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("https://c.api.flyfast.io/offers", { params: formData });
      const flightData = convertFlightsToTableData(response.data, formData.origin, formData.destination);

      if (flightData.length === 0) {
        setNoFlightsMessage("No flights available for the selected criteria.");
      } else {
        setFlights(flightData);
      }
    } catch (err) {
      setError("An error occurred while fetching flight data.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Find Your Perfect Flight</p>
              <p className="text-small text-default-500">Enter your travel details below</p>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                  name="origin"
                  label="Origin"
                  placeholder="Enter origin (IATA code)"
                  value={formData.origin}
                  onChange={handleInputChange}
              />
              <Input
                  name="destination"
                  label="Destination"
                  placeholder="Enter destination (IATA code)"
                  value={formData.destination}
                  onChange={handleInputChange}
              />
              <Input
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
              />
              <Input
                  name="endDate"
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
              />
              <Input
                  name="minTripLength"
                  label="Min Trip Length (days)"
                  type="number"
                  min={0}
                  value={formData.minTripLength}
                  onChange={handleInputChange}
              />
              <Input
                  name="maxTripLength"
                  label="Max Trip Length (days)"
                  type="number"
                  min={0}
                  value={formData.maxTripLength}
                  onChange={handleInputChange}
              />
              <Input
                  name="maxFlightDuration"
                  label="Max Flight Duration (minutes)"
                  type="number"
                  min={0}
                  value={formData.maxFlightDuration}
                  onChange={handleInputChange}
              />
              <Input
                  name="maxLayoverMinutes"
                  label="Max Layover Time (minutes)"
                  type="number"
                  min={0}
                  value={formData.maxLayoverMinutes}
                  onChange={handleInputChange}
              />
              <Input
                  name="excludedAirlines"
                  label="Excluded Airlines"
                  placeholder="Comma-separated IATA codes"
                  value={formData.excludedAirlines}
                  onChange={handleInputChange}
              />
              <Input
                  name="excludedAirports"
                  label="Excluded Airports"
                  placeholder="Comma-separated IATA codes"
                  value={formData.excludedAirports}
                  onChange={handleInputChange}
              />
              <Input
                  name="numAdults"
                  label="Number of Adults"
                  type="number"
                  min={1}
                  value={String(formData.numAdults)}
                  onChange={handleInputChange}
              />
              <Input
                  name="numChildren"
                  label="Number of Children"
                  type="number"
                  min={0}
                  value={String(formData.numChildren)}
                  onChange={handleInputChange}
              />
              <Input
                  name="stops"
                  label="Max Stops"
                  type="number"
                  min={0}
                  value={formData.stops}
                  onChange={handleInputChange}
              />
              <Select
                  name="cabin"
                  label="Cabin Class"
                  placeholder="Select a cabin class"
                  selectedKeys={[formData.cabin]}
                  onChange={handleSelectChange("cabin")}
              >
                <SelectItem key="Economy" value="Economy">Economy</SelectItem>
                <SelectItem key="Business" value="Business">Business</SelectItem>
              </Select>
              <Select
                  name="tripType"
                  label="Trip Type"
                  placeholder="Select a trip type"
                  selectedKeys={[formData.tripType]}
                  onChange={handleSelectChange("tripType")}
              >
                <SelectItem key="RoundTrip" value="RoundTrip">Round Trip</SelectItem>
                <SelectItem key="OneWay" value="OneWay">One Way</SelectItem>
              </Select>
              <Select
                  name="currencyCode"
                  label="Currency"
                  placeholder="Select a currency"
                  selectedKeys={[formData.currencyCode]}
                  onChange={handleSelectChange("currencyCode")}
              >
                <SelectItem key="USD" value="USD">USD</SelectItem>
                <SelectItem key="EUR" value="EUR">EUR</SelectItem>
                <SelectItem key="GBP" value="GBP">GBP</SelectItem>
              </Select>
              <div className="md:col-span-2 lg:col-span-3">
                <Button
                    color="primary"
                    type="submit"
                    isLoading={loading}
                    className="w-full"
                >
                  {loading ? "Searching..." : "Search Flights"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {error && (
            <Card>
              <CardBody>
                <p className="text-danger">{error}</p>
              </CardBody>
            </Card>
        )}

        {noFlightsMessage && (
            <Card>
              <CardBody>
                <p>{noFlightsMessage}</p>
              </CardBody>
            </Card>
        )}

        {flights.length > 0 && (
                <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
                  <AgGridReact
                      columnDefs={columnDefs}
                      rowData={flights}
                      pagination={true}
                      paginationPageSize={20}
                      rowSelection="multiple"
                      animateRows={true}
                  />
                </div>
        )}
      </div>
  );
};

export default FlightsComponent;