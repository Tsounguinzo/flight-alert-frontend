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
  DateRangePicker,
  Checkbox,
  CalendarDate,
} from "@nextui-org/react";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";

import { ColDef } from "ag-grid-community";
import { parseDate } from "@internationalized/date";
import { FaRightLeft } from "react-icons/fa6";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { PiCurrencyGbpBold, PiCurrencyJpyBold } from "react-icons/pi";
import { MdOutlineEuro } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";

import { Flight } from "./data";
import { convertFlightsToTableData } from "./data";

import { FlightsHeroBg } from "@/components/icons";
import Origin from "@/components/livesearch/Origin";
import Destination from "@/components/livesearch/Destination";
import StaySelector from "@/components/flights/stay";

import type { RangeValue } from "@/components/flights/index";

const FlightsComponent = () => {
  const [searchParams, setSearchParams] = useState({
      origin: "",
      destination: "",
      startDate: "",
      endDate: "",
      minTripLength: 0,
      maxTripLength: 0,
      maxDuration: 0,
      maxLayover: 0,
      excludedAirports: "",
      excludedAirlines: "",
      stops: 0,
      numAdults: 0,
      numChildren: 0,
      cabin: "",
      tripType: "",
      currencyCode: "USD",
      avoidUStops: true,
  });

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [error, setError] = useState("");
  const [noFlightsMessage, setNoFlightsMessage] = useState("");
  const [loadingRowId, setLoadingRowId] = useState(null);

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
      console.log("Flight Params:", flightParams);
      console.log("Search Params:", searchParams);
    try {
      const params = {
        ...searchParams,
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
      headerName: `Price (${searchParams.currencyCode})`,
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

  const handleSearchForm = async (searchParams: any) => {
    console.log("Search Params:", searchParams);
    setError("");
    setNoFlightsMessage("");

    if (
      !searchParams.origin ||
      !searchParams.destination ||
      !searchParams.minTripLength ||
      !searchParams.maxTripLength
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/offers", {
        params: searchParams,
      });

      console.log(response.data);

      const flightData = convertFlightsToTableData(response.data);

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
    const [stay, setStay] = useState<RangeValue>([12, 28]);

    const [maxDuration, setMaxDuration] = useState("");
    const [maxLayover, setMaxLayover] = useState("");
    const [excludedAirports, setExcludedAirports] = useState("");
    const [excludedAirlines, setExcludedAirlines] = useState("");
    const [maxStops, setMaxStops] = useState("");
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [cabinClass, setCabinClass] = useState("Economy");
    const [tripType, setTripType] = useState("RoundTrip");
    const [currency, setCurrency] = useState("EUR");
    const [avoidUStops, setAvoidUStops] = useState(false);

    const handleSwapLocations = () => {
      const temp = fromLocation;

      setFromLocation(toLocation);
      setToLocation(temp);
    };

    const getFormattedDate = (date: CalendarDate) => {
      const day = String(date.day).padStart(2, "0");
      const month = String(date.month).padStart(2, "0");
      const year = date.year;

      return `${year}-${month}-${day}`;
    };

    const handleSearchClick = () => {
      setSearchParams({
        origin: fromLocation,
        destination: toLocation,
        startDate: getFormattedDate(value.start),
        endDate: getFormattedDate(value.end),
        minTripLength: stay[0],
        maxTripLength: stay[1],
        maxDuration: maxDuration as unknown as number,
        maxLayover: maxLayover as unknown as number,
        excludedAirports,
        excludedAirlines,
        stops: maxStops as unknown as number,
        numAdults,
        numChildren,
        cabin: cabinClass,
        tripType,
        currencyCode: currency,
        avoidUStops,
      });

      handleSearchForm(searchParams);
    };

    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg">
          <div className="p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Origin origin={fromLocation} setOrigin={setFromLocation} />
                </div>
                <Button
                  isIconOnly
                  className="rounded-full w-8 h-8 min-w-8"
                  onClick={handleSwapLocations}
                >
                  <FaRightLeft className="w-3 h-3" />
                </Button>
                <div className="flex-1 min-w-[200px]">
                  <Destination
                    destination={toLocation}
                    setDestination={setToLocation}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <DateRangePicker
                  label="Date duration"
                  value={value}
                  visibleMonths={2}
                  onChange={setValue}
                />
              </div>
              <div className="min-w-[100px] h-full">
                <StaySelector
                  isInRange={true}
                  setValue={setStay}
                  value={stay}
                />
              </div>
              <Button
                className="min-w-[140px] rounded-lg bg-primary-300"
                isLoading={loading}
                size="lg"
                onClick={handleSearchClick}
              >
                {loading ? "Searching..." : "Search"}
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
                    value={maxStops}
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
                    <SelectItem
                      key="GBP"
                      endContent={<PiCurrencyGbpBold className="w-6 h-6" />}
                    >
                      British Pound (GBP)
                    </SelectItem>
                    <SelectItem
                      key="CAD"
                      endContent={<FaDollarSign className="w-6 h-6" />}
                    >
                      Canadian Dollar (CAD)
                    </SelectItem>
                    <SelectItem
                      key="EUR"
                      endContent={<MdOutlineEuro className="w-6 h-6" />}
                    >
                      Euro (EUR)
                    </SelectItem>
                    <SelectItem
                      key="JPY"
                      endContent={<PiCurrencyJpyBold className="w-6 h-6" />}
                    >
                      Japanese Yen (JPY)
                    </SelectItem>
                    <SelectItem
                      key="USD"
                      endContent={<FaDollarSign className="w-6 h-6" />}
                    >
                      US Dollar (USD)
                    </SelectItem>
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
                    selectedKeys={cabinClass}
                    onSelectionChange={(key) =>
                      setCabinClass(key.currentKey as string)
                    }
                  >
                    <SelectItem key="Economy">Economy</SelectItem>
                    <SelectItem key="Premium">Premium Economy</SelectItem>
                    <SelectItem key="Business">Business</SelectItem>
                    <SelectItem key="First">First</SelectItem>
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
                    selectedKeys={tripType}
                    onSelectionChange={(key) =>
                      setTripType(key.currentKey as string)
                    }
                  >
                    <SelectItem key="RoundTrip">Round Trip</SelectItem>
                    <SelectItem key="OneWay">One Way</SelectItem>
                  </Select>

                  <Checkbox
                    classNames={{
                      base: "max-w-full bg-gray-50 rounded-lg p-4",
                    }}
                    isSelected={avoidUStops}
                    onValueChange={setAvoidUStops}
                  >
                    AvoidUStops
                  </Checkbox>
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
      <div className="relative h-[175px]">
        <div className="absolute inset-0">
          <FlightsHeroBg />
        </div>
      </div>
      <div className="flex h-full w-full items-end">
        <FlightSearchForm />
      </div>
      <div className="container mx-auto pace-y-6 pt-10">
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
              paginationPageSize={10}
              paginationPageSizeSelector={[15, 25, 50, 100]}
              rowData={flights}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsComponent;
