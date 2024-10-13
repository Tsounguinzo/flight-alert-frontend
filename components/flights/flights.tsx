"use client";

import type { ColumnsKey, Flight } from "./data";
import type { Key } from "@react-types/shared";

import { Link, Selection, SortDescriptor } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  RadioGroup,
  Radio,
  Chip,
  Pagination,
  Divider,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import React, { useMemo, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import { ArrowDownIcon } from "./arrow-down";
import { ArrowUpIcon } from "./arrow-up";
import { columns, INITIAL_VISIBLE_COLUMNS, flights } from "./data";

import { useMemoizedCallback } from "@/hooks/use-memoized-callback";

export default function FlightsComponent() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "startDate",
    direction: "ascending",
  });

  const [startDateFilter, setStartDateFilter] = useState("all");
  const [returnDateFilter, setReturnDateFilter] = useState("all");
  const [departingAirportFilter, setDepartingAirportFilter] = useState("all");
  const [returningAirportFilter, setReturningAirportFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState<number | "all">("all");

  // Memoize header columns based on the visible columns and sort descriptor
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns
      .map((item) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }

        return item;
      })
      .filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  // Filter flights based on various criteria
  const itemFilter = useCallback(
    (flight: Flight) => {
      const allStartDate = startDateFilter === "all";
      const allReturnDate = returnDateFilter === "all";
      const allDepartingAirport = departingAirportFilter === "all";
      const allReturningAirport = returningAirportFilter === "all";
      const allPrice = priceFilter === "all";

      const startMatch =
        allStartDate || new Date(flight.startDate) >= new Date(startDateFilter);
      const returnMatch =
        allReturnDate ||
        new Date(flight.returnDate) <= new Date(returnDateFilter);
      const departingAirportMatch =
        allDepartingAirport ||
        flight.departingAirport.toLowerCase() ===
          departingAirportFilter.toLowerCase();
      const returningAirportMatch =
        allReturningAirport ||
        flight.returningAirport.toLowerCase() ===
          returningAirportFilter.toLowerCase();
      const priceMatch = allPrice || flight.price <= priceFilter;

      return (
        startMatch &&
        returnMatch &&
        departingAirportMatch &&
        returningAirportMatch &&
        priceMatch
      );
    },
    [
      startDateFilter,
      returnDateFilter,
      departingAirportFilter,
      returningAirportFilter,
      priceFilter,
    ],
  );

  // Apply filters and sorting to the flights data
  const filteredItems = useMemo(() => {
    let filteredFlights = [...flights];

    if (filterValue) {
      filteredFlights = filteredFlights.filter(
        (flight) =>
          flight.departingAirport
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          flight.returningAirport
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
      );
    }

    filteredFlights = filteredFlights.filter(itemFilter);

    return filteredFlights;
  }, [filterValue, itemFilter]);

  // Pagination calculations
  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  // Sorting logic
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: Flight, b: Flight) => {
      const col = sortDescriptor.column as keyof Flight;

      let first = a[col];
      let second = b[col];

      // Handle date and price sorting
      if (col === "startDate" || col === "returnDate") {
        first = new Date(first as string).getTime();
        second = new Date(second as string).getTime();
      } else if (col === "price") {
        first = first as number;
        second = second as number;
      }

      const cmp =
        first === undefined || second === undefined
          ? 0
          : first < second
            ? -1
            : first > second
              ? 1
              : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);


  // Handle selection keys filtering
  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === "all") return selectedKeys;
    let resultKeys = new Set<Key>();

    if (filterValue) {
      filteredItems.forEach((item) => {
        const stringId = String(item.id);

        if ((selectedKeys as Set<string>).has(stringId)) {
          resultKeys.add(stringId);
        }
      });
    } else {
      resultKeys = selectedKeys;
    }

    return resultKeys;
  }, [selectedKeys, filteredItems, filterValue]);

  const getSortableFieldsProps = useMemoizedCallback((col: string) => ({
    onClick: () => handleFieldClick(col),
  }));

  const renderCell = useMemoizedCallback(
    (flight: Flight, columnKey: React.Key) => {
      const flightKey = columnKey as ColumnsKey;

      const cellValue = flight[flightKey as unknown as keyof Flight] as string;

      switch (flightKey) {
        case "startDate":
        case "returnDate":
          return (
            <div className="flex items-center gap-1">
              <Icon
                className="h-[16px] w-[16px] text-default-300"
                icon="solar:calendar-minimalistic-linear"
              />
              <p className="text-nowrap text-small capitalize text-default-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(cellValue as unknown as Date)}
              </p>
            </div>
          );
        case "departingAirport":
        case "returningAirport":
          return (
            <div className="flex items-center gap-2">
              <Icon
                className="h-[16px] w-[16px] text-default-300"
                icon="carbon:airport-location"
              />
              <p className="text-nowrap text-small text-default-foreground">
                {cellValue}
              </p>
            </div>
          );

        case "price":
          return (
            <div className="text-nowrap text-small text-default-foreground">
              {Number(cellValue).toFixed(2)} $US
            </div>
          );
        case "stay":
          return (
            <div className="text-nowrap text-small text-default-foreground">
              {cellValue} days
            </div>
          );
        case "actions":
          return (
            <Button
              as={Link}
              color="primary"
              href={flight?.link || "#"}
              target={"_blank"}
              variant="flat"
            >
              Book Now
            </Button>
          );
        default:
          return cellValue;
      }
    },
  );

  const onNextPage = useMemoizedCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  });

  const onPreviousPage = useMemoizedCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  });

  const onSearchChange = useMemoizedCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  });

  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (keys === "all") {
      if (filterValue) {
        const resultKeys = new Set(
          filteredItems.map((item) => String(item.id)),
        );

        setSelectedKeys(resultKeys);
      } else {
        setSelectedKeys(keys);
      }
    } else if (keys.size === 0) {
      setSelectedKeys(new Set());
    } else {
      const resultKeys = new Set<Key>();

      keys.forEach((v) => {
        resultKeys.add(v);
      });
      const selectedValue =
        selectedKeys === "all"
          ? new Set(filteredItems.map((item) => String(item.id)))
          : selectedKeys;

      selectedValue.forEach((v) => {
        if (items.some((item) => String(item.id) === v)) {
          return;
        }
        resultKeys.add(v);
      });
      setSelectedKeys(new Set(resultKeys));
    }
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-4 overflow-auto px-[6px] py-[4px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Input
              className="min-w-[200px]"
              endContent={
                <SearchIcon className="text-default-400" width={16} />
              }
              placeholder="Search"
              size="sm"
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <div>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }
                  >
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full flex-col gap-6 px-2 py-4">
                    {/* Departing Airport Filter */}
                    <RadioGroup
                      label="Departing Airport"
                      value={departingAirportFilter}
                      onValueChange={setDepartingAirportFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="JFK">JFK - New York</Radio>
                      <Radio value="LAX">LAX - Los Angeles</Radio>
                      <Radio value="SFO">SFO - San Francisco</Radio>
                      <Radio value="ATL">ATL - Atlanta</Radio>
                      <Radio value="ORD">ORD - Chicago</Radio>
                    </RadioGroup>

                    {/* Returning Airport Filter */}
                    <RadioGroup
                      label="Returning Airport"
                      value={returningAirportFilter}
                      onValueChange={setReturningAirportFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="JFK">JFK - New York</Radio>
                      <Radio value="LAX">LAX - Los Angeles</Radio>
                      <Radio value="SFO">SFO - San Francisco</Radio>
                      <Radio value="ATL">ATL - Atlanta</Radio>
                      <Radio value="ORD">ORD - Chicago</Radio>
                    </RadioGroup>

                    {/* start Date Filter */}
                    <RadioGroup
                      label="start Date"
                      value={startDateFilter}
                      onValueChange={setStartDateFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value={new Date().toISOString()}>Today</Radio>
                      <Radio
                        value={new Date(
                          Date.now() - 7 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Last 7 days
                      </Radio>
                      <Radio
                        value={new Date(
                          Date.now() + 7 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Next 7 days
                      </Radio>
                      <Radio
                        value={new Date(
                          Date.now() + 30 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Next 30 days
                      </Radio>
                    </RadioGroup>

                    {/* Return Date Filter */}
                    <RadioGroup
                      label="Return Date"
                      value={returnDateFilter}
                      onValueChange={setReturnDateFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value={new Date().toISOString()}>Today</Radio>
                      <Radio
                        value={new Date(
                          Date.now() - 7 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Last 7 days
                      </Radio>
                      <Radio
                        value={new Date(
                          Date.now() + 7 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Next 7 days
                      </Radio>
                      <Radio
                        value={new Date(
                          Date.now() + 30 * 24 * 60 * 60 * 1000,
                        ).toISOString()}
                      >
                        Next 30 days
                      </Radio>
                    </RadioGroup>

                    {/* Price Range Filter
                    <RadioGroup
                        label="Price Range"
                        value={priceFilter}
                        onValueChange={(value) => setPriceFilter(value as number | "all")}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value={500}>Under $500</Radio>
                      <Radio value={1000}>Under $1000</Radio>
                      <Radio value={1500}>Under $1500</Radio>
                    </RadioGroup>
                    */}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter(
                    (c) => !["actions", "teams"].includes(c.uid),
                  )}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === "ascending"
                              ? "descending"
                              : "ascending",
                        });
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter((c) => !["actions"].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item) => (
                    <DropdownItem key={item.uid}>{item.name}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-5" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} Selected`}
          </div>

          {(filterSelectedKeys === "all" || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-default-100 text-default-800"
                  endContent={
                    <Icon
                      className="text-default-400"
                      icon="solar:alt-arrow-down-linear"
                    />
                  }
                  size="sm"
                  variant="flat"
                >
                  Selected Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Selected Actions">
                <DropdownItem key="send-email">Send email</DropdownItem>
                <DropdownItem key="pay-invoices">Pay invoices</DropdownItem>
                <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>
                <DropdownItem key="end-contract">End contract</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    filterSelectedKeys,
    headerColumns,
    sortDescriptor,
    startDateFilter,
    returnDateFilter,
    departingAirportFilter,
    returningAirportFilter,
    priceFilter,
    setStartDateFilter,
    setReturnDateFilter,
    setDepartingAirportFilter,
    setReturningAirportFilter,
    setPriceFilter,
    onSearchChange,
    setVisibleColumns,
  ]);

  const topBar = useMemo(() => {
    return (
      <div className="mb-[18px] flex items-center justify-between">
        <div className="flex w-[226px] items-center gap-2">
          <h1 className="text-2xl font-[700] leading-[32px]">Flights</h1>
          <Chip
            className="hidden items-center text-default-500 sm:flex"
            size="sm"
            variant="flat"
          >
            {flights.length}
          </Chip>
        </div>
        {/*
        <Button
          color="primary"
          endContent={<Icon icon="solar:add-circle-bold" width={20} />}
        >
          Add Alert
        </Button>
        */}
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between gap-2 px-2 py-2 sm:flex-row">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex items-center justify-end gap-6">
          <span className="text-small text-default-400">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <div className="flex items-center gap-3">
            <Button
              isDisabled={page === 1}
              size="sm"
              variant="flat"
              onPress={onPreviousPage}
            >
              Previous
            </Button>
            <Button
              isDisabled={page === pages}
              size="sm"
              variant="flat"
              onPress={onNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterSelectedKeys,
    page,
    pages,
    filteredItems.length,
    onPreviousPage,
    onNextPage,
  ]);

  const handleFieldClick = useMemoizedCallback((col: string) => {
    setSortDescriptor({
      column: col,
      direction:
        sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
  });

  return (
    <div className="h-screen mb-20 p-6">
      {topBar}
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          td: "before:bg-transparent",
        }}
        selectedKeys={filterSelectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={onSelectionChange}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
              className={cn([
                column.uid === "actions"
                  ? "flex items-center justify-end px-[20px]"
                  : "",
              ])}
            >
              {(column.uid !== "departingAirport" && column.uid !== "returningAirport" && column.uid !== "actions") ? (
                <div
                  {...getSortableFieldsProps(column.uid)}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  {column.name}
                  {column.sortDirection === "ascending" ? (
                    <ArrowUpIcon className="text-default-400" />
                  ) : (
                    <ArrowDownIcon className="text-default-400" />
                  )}
                </div>
              ) : column.info ? (
                <div className="flex min-w-[108px] items-center justify-between">
                  {column.name}
                  <Tooltip content={column.info}>
                    <Icon
                      className="text-default-300"
                      height={16}
                      icon="solar:info-circle-linear"
                      width={16}
                    />
                  </Tooltip>
                </div>
              ) : (
                column.name
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
