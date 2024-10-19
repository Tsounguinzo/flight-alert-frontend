"use client";

import { Icon } from "@iconify/react";
import { RiPlaneLine } from "react-icons/ri";
import { PiEyesFill } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { faqs } from "./faqs";

import Hero from "@/components/Hero";
import { SolutionIcon } from "@/components/icons";
import Deals from "@/components/Deals";

function FAQ() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 pt-16 pb-20">
      <h2 className="leading-7 mb-8 text-3xl text-center mb-8">
        <span className="inline-block md:hidden">FAQs</span>
        <span className="hidden md:inline-block">
          Frequently asked questions
        </span>
      </h2>
      <Accordion
        fullWidth
        keepContentMounted
        className="gap-3"
        items={faqs}
        selectionMode="multiple"
        variant="splitted"
      >
        {faqs.map((item) => (
          <AccordionItem
            key={item.title}
            className="shadow-lg hover:bg-[#457EFF] transition-all duration-200"
            indicator={
              <Icon
                className="text-foreground"
                style={{
                  color: "#fff",
                }}
                icon="bi:plus-circle-fill"
                width={30}
              />
            }
            style={{
              backgroundColor: "#457EFF",
            }}
            title={<p className="text-white">{item.title}</p>}
          >
            <p className="text-white">{item.content}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function HowItWorks() {
  const features = [
    {
      title: "Start with your airport.",
      description:
        "Choose CA departure airports like your biggest airport, closest airport, and maybe even your parent’s.",
      icon: <RiPlaneLine className="h-12 w-12 mx-auto" />,
    },
    {
      title: "Watch the deals roll in.",
      description:
        "We keep a close eye on airfare to over 900 destinations around the world. When the prices drop, you know.",
      icon: <PiEyesFill className="h-12 w-12 mx-auto" />,
    },
    {
      title: "Then book it.",
      description:
        "With flight details, booking links, and timeline estimates, all that’s left for you is to say, “Let’s go!”",
      icon: <FaCalendarCheck className="h-12 w-12 mx-auto" />,
    },
  ];

  return (
    <section
      id={"HowItWorks"}
      className="w-full max-w-[1280px] mx-auto px-6 py-16"
    >
      <h2 className="text-3xl text-center mb-8">Our Solution</h2>
      <p
        className="text-center mb-8"
        style={{
          color: "#5E646B",
        }}
      >
        Lorem oftware developer with a passion for aviation and a desire to work
        in a flexible, remote environment? At RiverCode, we're always looking
        for skilled independent contractors to join our dynamic team.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="p-4 shadow-lg rounded-lg overflow-hidden"
            style={{
              border: "1px solid #D0E0E7",
            }}
          >
            <div className="mb-4">
              <SolutionIcon />
            </div>
            <div className="text-start">
              <h6 className="font-bold mb-1">{feature.title}</h6>
              <p
                className="text-sm"
                style={{
                  color: "#5E646B",
                }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <Hero />

      <HowItWorks />

      <Deals />

      <FAQ />
    </div>
  );
}
