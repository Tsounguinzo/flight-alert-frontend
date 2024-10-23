"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

import { HeroBg, SwapDepArrIcon } from "./icons";
import PassengerSelector from "./livesearch/PassengerSelector";
import Origin from "./livesearch/Origin";
import Destination from "./livesearch/Destination";

export default function Hero() {
  const flightTypes = [
    { label: "Round Trip", key: "Round Trip" },
    { label: "One Way", key: "One Way" },
    { label: "Miles", key: "Miles" },
  ];
  const flightClass = [
    { label: "Economy", key: "Economy" },
    { label: "Premium", key: "Premium" },
    { label: "Business", key: "Business" },
    { label: "First", key: "First" },
  ];

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSwap = () => {
    const x = origin;
    const y = destination;

    setOrigin(y);
    setDestination(x);
  };

  return (
    <section
      className="relative h-[70vh] z-20 flex items-start gap-[18px] sm:gap-6 w-full"
      style={{
        background: "#E8EBED",
      }}
    >
      <div className="w-full h-full px-6 py-12">
        <LazyMotion features={domAnimation}>
          <m.div
            animate="kick"
            className="flex flex-col gap-6 w-full h-full justify-center"
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
                key={"section1"}
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 2 }}
                transition={{
                  bounce: 0,
                  delay: 0,
                  duration: 0.8 + 0.1 * 3,
                  type: "spring",
                }}
              >
                <div className="from-black to-blue-500 text-5xl">
                  Time is Money. FlyFast <br />
                  Saves You Both !
                </div>
              </m.div>

              <m.div
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                initial={{ filter: "blur(16px)", opacity: 0, x: 15 + 1 * 3 }}
                transition={{
                  bounce: 0,
                  delay: 0,
                  duration: 0.8 + 0.1 * 4,
                  type: "spring",
                }}
              >
                <div className=" flex flex-col w-[60%] transition-all duration-500 rounded-3xl border-1 border-[#457EFF]">
                  <div className="p-5 flex items-center rounded-tl-3xl rounded-tr-3xl gap-3 bg-white w-full">
                    <Select
                      aria-label="type"
                      className="w-[140px]"
                      defaultSelectedKeys={["Round Trip"]}
                      radius={"sm"}
                    >
                      {flightTypes.map((type) => (
                        <SelectItem key={type.key}>{type.label}</SelectItem>
                      ))}
                    </Select>
                    <PassengerSelector />
                    <Select
                      aria-label="class"
                      className="w-[140px]"
                      defaultSelectedKeys={["Economy"]}
                      radius={"sm"}
                    >
                      {flightClass.map((fClass) => (
                        <SelectItem key={fClass.key}>{fClass.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="w-full h-[1px] bg-[#000000] opacity-[17%]" />

                  <div className="p-5 flex items-center rounded-bl-3xl rounded-br-3xl gap-3 bg-[#F3F3F3] w-full">
                    <div className="flex items-center gap-3 w-full">
                      {/* Origin Autocomplete */}
                      <Origin origin={origin} setOrigin={setOrigin} />
                      {/* Swap Button */}
                      <Button
                        isIconOnly
                        style={{ backgroundColor: "#F4F4F5" }}
                        onClick={handleSwap}
                      >
                        <SwapDepArrIcon />
                      </Button>
                      {/* Destination Autocomplete */}
                      <Destination
                        destination={destination}
                        setDestination={setDestination}
                      />
                    </div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </m.div>
        </LazyMotion>
      </div>
      <div className="hidden md:block absolute bottom-0 right-0">
        <HeroBg />
      </div>
    </section>
  );
}
