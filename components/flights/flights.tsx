"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
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
  const [urlLoading, setUrlLoading] = useState(false);
  const [error, setError] = useState("");
  const [noFlightsMessage, setNoFlightsMessage] = useState("");
  const [loadingRowId, setLoadingRowId] = useState(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange =
    (name: string) => (e: { target: { value: any } }) => {
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

  function formatDateToYMD(dateString: string | number | Date) {
    const inputDate = new Date(dateString);

    const year = inputDate.getFullYear(); // Get full year (4 digits)
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Get month (01-12)
    const day = String(inputDate.getDate()).padStart(2, "0"); // Get day (01-31)

    return `${year}-${month}-${day}`;
  }

  const fetchBookingUrl = async (flightParams: Flight) => {
    try {
      const params = {
        ...formData,
        ...flightParams,
        startDate: formatDateToYMD(flightParams.startDate),
        endDate: formatDateToYMD(flightParams.returnDate),
        currencyCode: undefined, // Remove currencyCode as it's not needed for URL generation
      };

      const response = await axios.get("https://c.api.flyfast.io/url", {
        params,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching booking URL:", error);

      return "#";
    }
  };

  const handleBookNowClick = async (params: any) => {
    setLoadingRowId(params.id);
    setUrlLoading(true);
    const url = await fetchBookingUrl(params.data);

    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Unable to generate booking link. Please try again later.");
    }
    setUrlLoading(false);
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
          isDisabled={urlLoading && loadingRowId !== params.data.id}
          isLoading={loadingRowId === params.data.id}
          size="sm"
          onClick={() => handleBookNowClick(params)}
        >
          Book Now
        </Button>
      ),
    },
  ];

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setNoFlightsMessage("");

    if (
      !formData.origin ||
      !formData.destination ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("https://c.api.flyfast.io/offers", {
        params: formData,
      });
      const flightData = convertFlightsToTableData(
        response.data,
        formData.origin,
        formData.destination,
      );

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
            <p className="text-small text-default-500">
              Enter your travel details below
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            onSubmit={handleSearch}
          >
            <Input
              label="Origin"
              name="origin"
              placeholder="Enter origin (IATA code)"
              value={formData.origin}
              onChange={handleInputChange}
            />
            <Input
              label="Destination"
              name="destination"
              placeholder="Enter destination (IATA code)"
              value={formData.destination}
              onChange={handleInputChange}
            />
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            <Input
              label="Min Trip Length (days)"
              min={0}
              name="minTripLength"
              type="number"
              value={formData.minTripLength}
              onChange={handleInputChange}
            />
            <Input
              label="Max Trip Length (days)"
              min={0}
              name="maxTripLength"
              type="number"
              value={formData.maxTripLength}
              onChange={handleInputChange}
            />
            <Input
              label="Max Flight Duration (minutes)"
              min={0}
              name="maxFlightDuration"
              type="number"
              value={formData.maxFlightDuration}
              onChange={handleInputChange}
            />
            <Input
              label="Max Layover Time (minutes)"
              min={0}
              name="maxLayoverMinutes"
              type="number"
              value={formData.maxLayoverMinutes}
              onChange={handleInputChange}
            />
            <Input
              label="Excluded Airlines"
              name="excludedAirlines"
              placeholder="Comma-separated IATA codes"
              value={formData.excludedAirlines}
              onChange={handleInputChange}
            />
            <Input
              label="Excluded Airports"
              name="excludedAirports"
              placeholder="Comma-separated IATA codes"
              value={formData.excludedAirports}
              onChange={handleInputChange}
            />
            <Input
              label="Number of Adults"
              min={1}
              name="numAdults"
              type="number"
              value={String(formData.numAdults)}
              onChange={handleInputChange}
            />
            <Input
              label="Number of Children"
              min={0}
              name="numChildren"
              type="number"
              value={String(formData.numChildren)}
              onChange={handleInputChange}
            />
            <Input
              label="Max Stops"
              min={0}
              name="stops"
              type="number"
              value={formData.stops}
              onChange={handleInputChange}
            />
            <Select
              label="Cabin Class"
              name="cabin"
              placeholder="Select a cabin class"
              selectedKeys={[formData.cabin]}
              onChange={handleSelectChange("cabin")}
            >
              <SelectItem key="Economy" value="Economy">
                Economy
              </SelectItem>
              <SelectItem key="Business" value="Business">
                Business
              </SelectItem>
            </Select>
            <Select
              label="Trip Type"
              name="tripType"
              placeholder="Select a trip type"
              selectedKeys={[formData.tripType]}
              onChange={handleSelectChange("tripType")}
            >
              <SelectItem key="RoundTrip" value="RoundTrip">
                Round Trip
              </SelectItem>
              <SelectItem key="OneWay" value="OneWay">
                One Way
              </SelectItem>
            </Select>
            <Select
              label="Currency"
              name="currencyCode"
              placeholder="Select a currency"
              selectedKeys={[formData.currencyCode]}
              onChange={handleSelectChange("currencyCode")}
            >
              <SelectItem key="USD" value="USD">
                USD
              </SelectItem>
              <SelectItem key="EUR" value="EUR">
                EUR
              </SelectItem>
              <SelectItem key="GBP" value="GBP">
                GBP
              </SelectItem>
            </Select>
            <div className="md:col-span-2 lg:col-span-3">
              <Button
                className="w-full"
                color="primary"
                isLoading={loading}
                type="submit"
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
            animateRows={true}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={20}
            rowData={flights}
            rowSelection="multiple"
          />
        </div>
      )}
    </div>
  );
};

export default FlightsComponent;
