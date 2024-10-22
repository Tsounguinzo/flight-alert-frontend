"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { HeroBg } from "./icons";

export default function Hero() {

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
                <div className="p-28 w-[60%] transition-all duration-500 bg-blue-500 text-4xl rounded-md">
                    Future search form
                  </div>
              </m.div>
            </AnimatePresence>
          </m.div>
        </LazyMotion>
      </div>
      <div className="hidden md:block absolute bottom-0 right-0">
        <HeroBg/>
      </div>
    </section>
  );
}
