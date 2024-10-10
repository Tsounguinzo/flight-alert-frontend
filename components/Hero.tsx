"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

export default function Hero() {
  return (
    <section className="z-20 flex flex-col items-start gap-[18px] sm:gap-6 w-full">
      <LazyMotion features={domAnimation}>
        <m.div
          animate="kick"
          className="flex flex-col gap-6"
          exit="auto"
          initial="auto"
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          variants={{
            auto: { width: "auto" },
            kick: { width: "auto" },
          }}
        >
          <AnimatePresence mode="wait">
            <m.div
              animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
              className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[98px]"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 2 }}
              transition={{
                bounce: 0,
                delay: 0,
                duration: 0.8 + 0.1 * 3,
                type: "spring",
              }}
            >
              <div className="from-black to-blue-500">
                Save up to <br />
                <span className="text-primary"> 40-90% </span> off flights{" "}
                <br />
                from your city.
              </div>
            </m.div>

            <m.div
              animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
              className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[20px]"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 3 }}
              transition={{
                bounce: 0,
                delay: 0,
                duration: 0.8 + 0.1 * 4,
                type: "spring",
              }}
            >
              Acme makes running global teams simple. HR, Payroll, International
              Employment, contractor management and more.
            </m.div>

            <m.div
              animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 4 }}
              transition={{
                bounce: 0,
                delay: 0.01 * 50,
                duration: 0.8 + 0.1 * 10,
                type: "spring",
              }}
            >
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
            </m.div>
          </AnimatePresence>
        </m.div>
      </LazyMotion>
    </section>
  );
}
