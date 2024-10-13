"use client";

import { Button } from "@nextui-org/react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { MdFlight } from "react-icons/md";
import { useState } from "react";
import { MdElectricBolt } from "react-icons/md";

import LiveSearchForm from "./livesearch/LiveSearchForm";

export default function Hero() {
  const [activeButton, setActiveButton] = useState("liveSearch");

  return (
    <section className="z-20 flex flex-col items-start gap-[18px] sm:gap-6 w-full">
      <LazyMotion features={domAnimation}>
        <m.div
          animate="kick"
          className="flex flex-col gap-6 w-full"
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
              className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[80px] w-full"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 2 }}
              transition={{
                bounce: 0,
                delay: 0,
                duration: 0.8 + 0.1 * 3,
                type: "spring",
              }}
            >
              <div className="from-black to-blue-500">
                Time is Money : <br />
                FlyFast Saves <br /> You Both !
              </div>
            </m.div>

            <m.div
              animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
              className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[20px] w-full"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 3 }}
              transition={{
                bounce: 0,
                delay: 0,
                duration: 0.8 + 0.1 * 4,
                type: "spring",
              }}
            >
              <div className="flex">
                {/* Button 1: Live Search */}
                <Button
                  className={`py-8 transition-all duration-500 rounded-r-none ${
                    activeButton === "liveSearch"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  startContent={<MdFlight size={25} />}
                  onClick={() => setActiveButton("liveSearch")}
                >
                  Live Search
                </Button>

                {/* Button 2: Alerts */}
                <div className="relative">
                  {/* Soon label */}
                  <span
                    className="absolute -top-1 left-3 z-10 transform -translate-y-2 -translate-x-2 text-white text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "#FF7F0B",
                    }}
                  >
                    Soon
                  </span>

                  <Button
                    className={`py-8 px-10 transition-all duration-500 rounded-l-none rounded-r-full ${
                      activeButton === "alerts"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    startContent={<MdElectricBolt size={25} />}
                    onClick={() => setActiveButton("alerts")}
                  >
                    Alerts
                  </Button>
                </div>
              </div>
            </m.div>
            <m.div
              animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
              className="text-start font-normal leading-7 text-default-500 sm:text-[20px] w-full"
              initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 4 }}
              transition={{
                bounce: 0,
                delay: 0,
                duration: 0.8 + 0.1 * 5,
                type: "spring",
              }}
            >
              <LiveSearchForm />
            </m.div>
          </AnimatePresence>
        </m.div>
      </LazyMotion>
    </section>
  );
}
