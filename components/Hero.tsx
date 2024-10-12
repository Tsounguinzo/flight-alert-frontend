"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function Hero() {
  return (
    <section className="z-20 flex flex-col items-start gap-[18px] sm:gap-6 w-full">
      <div className="flex flex-col gap-6">
        <div className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[98px]">
          <div className="from-black to-blue-500">
            War On Flight Prices: <br />
            Get The Cheapest Flight Everytime
          </div>
        </div>

        <div className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[20px]">
          Acme makes running global teams simple. HR, Payroll, International
          Employment, contractor management and more.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button
            className="h-10 w-fit bg-default-foreground p-[24px] text-lg font-medium leading-5 text-background"
            radius="full"
          >
            Get Free Flights Alert
          </Button>
          <Button
            className="h-10 w-[163px] border-1 border-foreground px-[16px] py-[10px] text-small font-medium leading-5"
            endContent={
              <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-foreground">
                <Icon
                  className="text-background [&>path]:stroke-[1.5]"
                  icon="solar:arrow-right-linear"
                  width={16}
                />
              </span>
            }
            radius="full"
            variant="bordered"
          >
            See our plans
          </Button>
        </div>
      </div>
    </section>
  );
}
