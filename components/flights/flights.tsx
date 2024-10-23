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
  DateRangePicker,
} from "@nextui-org/react";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";

import { ColDef } from "ag-grid-community";
import { parseDate } from "@internationalized/date";
import { FaRightLeft } from "react-icons/fa6";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";

import { Flight } from "./data";
import { convertFlightsToTableData } from "./data";

import { FlightsHeroBg } from "@/components/icons";
import Origin from "@/components/livesearch/Origin";
import Destination from "@/components/livesearch/Destination";
import PassengerSelector from "@/components/livesearch/PassengerSelector";

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
    return `${Number(params.value).toFixed(2)}`;
  };

  const stayFormatter = (params: { value: string | number | Date }) => {
    return `${params.value}`;
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

      const response = await axios.get("http://localhost:8080/url", {
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
      field: "departingAirport",
      headerName: "From",
      sortable: true,
    },
    {
      field: "returningAirport",
      headerName: "To",
      sortable: true,
    },
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
      headerName: "Stay (days)",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: stayFormatter,
    },
    {
      field: "price",
      headerName: `Price (${formData.currencyCode})`,
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: priceFormatter,
    },
    {
      headerName: "Booking Link",
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
      const response = await axios.get("http://localhost:8080/offers", {
        params: formData,
      });

      console.log("response.data", response.data);
      const flightData = convertFlightsToTableData(
        response.data,
        formData.origin,
        formData.destination,
      );

      console.log("flightData", flightData);
      if (flightData.length === 0) {
        setNoFlightsMessage("No flights available for the selected criteria.");
      } else {
        setFlights(flightData);
      }
    } catch (err) {
      setError(
        err?.response?.data?.error || "An error occurred. Please try again.",
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const FlightSearchForm = () => {
    const [fromLocation, setFromLocation] = useState("YUL");
    const [toLocation, setToLocation] = useState("YUL");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [value, setValue] = React.useState({
      start: parseDate("2024-04-01"),
      end: parseDate("2024-04-08"),
    });

    const [maxDuration, setMaxDuration] = useState("");
    const [maxLayover, setMaxLayover] = useState("");
    const [excludedAirports, setExcludedAirports] = useState("");
    const [excludedAirlines, setExcludedAirlines] = useState("");
    const [maxStops, setMaxStops] = useState("");
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [cabinClass, setCabinClass] = useState("Economy");
    const [tripType, setTripType] = useState("Round Trip");
    const [currency, setCurrency] = useState("EUR");

    const handleSwapLocations = () => {
      const temp = fromLocation;

      setFromLocation(toLocation);
      setToLocation(temp);
    };

    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg">
          {/* Main Search Form - Fixed Position */}
          <div className="p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <Origin origin={fromLocation} setOrigin={setFromLocation} />
              </div>

              <Button
                isIconOnly
                className="rounded-full min-w-12 h-12"
                onClick={handleSwapLocations}
              >
                <FaRightLeft className="w-5 h-5" />
              </Button>

              <div className="flex-1 min-w-[200px]">
                <Destination
                  destination={toLocation}
                  setDestination={setToLocation}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <DateRangePicker
                  label="Date duration"
                  value={value}
                  visibleMonths={2}
                  onChange={setValue}
                />
              </div>

              <div className="min-w-[100px]">
                <PassengerSelector />
              </div>

              <Button
                className="min-w-[140px] rounded-lg bg-primary-300"
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Advanced Filters Toggle - Fixed Position */}
          <div className="px-6 pb-4">
            <div className="border-t border-gray-200 pt-4">
              <Button
                className="p-0 h-auto font-medium"
                endContent={
                  showAdvanced ? (
                    <FiChevronsUp className="w-4 h-4" />
                  ) : (
                    <FiChevronsDown className="w-4 h-4" />
                  )
                }
                variant="light"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <div className="flex items-center gap-2">Advanced filters</div>
              </Button>
            </div>
          </div>

          {/* Advanced Filters Section - Expandable */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${showAdvanced ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Max Flight Duration (minutes)"
                    placeholder="Enter duration"
                    type="number"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                  />

                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Excluded Airports"
                    placeholder="Comma-separated IATA codes"
                    value={excludedAirports}
                    onChange={(e) => setExcludedAirports(e.target.value)}
                  />

                  <Select
                    classNames={{
                      base: "max-w-full",
                      trigger: "bg-gray-50",
                    }}
                    label="Max Stops"
                    value={currency}
                    onChange={(e) => setMaxStops(e.target.value)}
                  >
                    <SelectItem key="0">NonStop Only</SelectItem>
                    <SelectItem key="1">1 stop or fewer</SelectItem>
                    <SelectItem key="2">2 stops or fewer</SelectItem>
                    <SelectItem key="3">Any number of stops</SelectItem>
                  </Select>

                  <Select
                    classNames={{
                      base: "max-w-full",
                      trigger: "bg-gray-50",
                    }}
                    label="Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <SelectItem key="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem key="CAD">Canadian Dollar (CAD)</SelectItem>
                    <SelectItem key="EUR">Euro (EUR)</SelectItem>
                    <SelectItem key="JPY">Japanese Yen (JPY)</SelectItem>
                    <SelectItem key="USD">US Dollar (USD)</SelectItem>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Max Layover Time (minutes)"
                    placeholder="Enter layover time"
                    type="number"
                    value={maxLayover}
                    onChange={(e) => setMaxLayover(e.target.value)}
                  />

                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Number of Adults"
                    min={1}
                    type="number"
                    value={numAdults}
                    onChange={(e) => setNumAdults(Number(e.target.value))}
                  />

                  <Select
                    classNames={{
                      base: "max-w-full",
                      trigger: "bg-gray-50",
                    }}
                    label="Cabin Class"
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                  >
                    <SelectItem key="economy">Economy</SelectItem>
                    <SelectItem key="premium">Premium Economy</SelectItem>
                    <SelectItem key="business">Business</SelectItem>
                    <SelectItem key="first">First</SelectItem>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Excluded Airlines"
                    placeholder="Comma-separated IATA codes"
                    value={excludedAirlines}
                    onChange={(e) => setExcludedAirlines(e.target.value)}
                  />

                  <Input
                    classNames={{
                      base: "max-w-full",
                      input: "bg-gray-50",
                    }}
                    label="Number of Children"
                    min={0}
                    type="number"
                    value={numChildren}
                    onChange={(e) => setNumChildren(Number(e.target.value))}
                  />

                  <Select
                    classNames={{
                      base: "max-w-full",
                      trigger: "bg-gray-50",
                    }}
                    label="Trip Type"
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                  >
                    <SelectItem key="round">Round Trip</SelectItem>
                    <SelectItem key="one">One Way</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-0 space-y-6">
      <div className="relative mb-56">
        <FlightsHeroBg />
        <div className="absolute inset-x-0 top-48 z-10">
          <FlightSearchForm />
        </div>
      </div>
      <div className="container mx-auto pace-y-6 pt-28">
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
                <SelectItem key="Premium" value="Premium">
                  Premium
                </SelectItem>
                <SelectItem key="Business" value="Business">
                  Business
                </SelectItem>
                <SelectItem key="First" value="First">
                  First
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
          <div
            className="ag-theme-quartz"
            style={{ height: 800, width: "100%" }}
          >
            <AgGridReact
              animateRows={true}
              autoSizeStrategy={{ type: "fitGridWidth" }}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={20}
              rowData={flights}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsComponent;
