"use client";

import React from "react";
import {AgGridReact, CustomCellRendererProps} from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@nextui-org/react";

import { convertFlightsToTableData } from "./data";
import { Flight, FlightData } from "./data";

import sampleFlights from "@/data/sample-flights.json";
import Link from "next/link";

const sampleFlightsParsed: Flight[] = convertFlightsToTableData(
  sampleFlights as FlightData,
  "JFK",
  "LAX",
);

export default function FlightsComponent() {
  const [flights, setFlights] = React.useState(sampleFlightsParsed);
  const dateFormatter = (params: { value: string | number | Date }) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(params.value));
  };

  const priceFormatter = (params: { value: any }) => {
    return `${Number(params.value).toFixed(2)} $US`;
  };

  const stayFormatter = (params: { value: any }) => {
    return `${params.value} days`;
  };

  // Define ag-Grid columns
  const columnDefs = [
    {
      field: "startDate",
      headerName: "Departure Date",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: dateFormatter,
    },
    {
      field: "returnDate",
      headerName: "Return Date",
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
      headerName: "Departing Airport",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "returningAirport",
      headerName: "Returning Airport",
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
      headerName: "Actions",
      field: "actions",
      sortable: false,
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <Button
            as={Link}
            className="mt-2"
            color="primary"
            href={params.data.link || "#"}
            target="_blank"
            variant="flat"
          >
            Book Now
          </Button>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          rowData={flights}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
}
