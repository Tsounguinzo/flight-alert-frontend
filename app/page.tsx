"use client";

import { Icon } from "@iconify/react";
import { RiPlaneLine } from "react-icons/ri";
import { PiEyesFill } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import { Accordion, AccordionItem } from "@nextui-org/react";

import { faqs } from "./faqs";

import Hero from "@/components/Hero";

function FAQ() {
  return (
    <section className="mx-auto w-full max-w-6xl px-0 py-20 ">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <h2 className="px-2 text-3xl leading-7">
          <span className="inline-block md:hidden">FAQs</span>
          <span className="hidden md:inline-block">
            Frequently asked questions
          </span>
        </h2>
        <Accordion
          fullWidth
          keepContentMounted
          className="gap-3"
          itemClasses={{
            base: "px-6 !bg-primary !shadow-none hover:!bg-primary/50",
            title: "font-medium",
            trigger: "py-6",
            content: "pt-0 pb-6 text-base text-foreground",
          }}
          items={faqs}
          selectionMode="multiple"
          variant="splitted"
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              className="bg-primary border-2 border-foreground shadow-lg"
              indicator={
                <Icon
                  className="text-foreground"
                  icon="bi:plus-circle-fill"
                  width={30}
                />
              }
              title={item.title}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
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
    <section className="py-28" id={"HowItWorks"}>
      <h2 className="text-3xl font-extrabold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border-2 border-foreground shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-foreground text-white text-center p-4">
              {feature.title}
            </div>
            <div className="p-6 text-center">
              <div className="mb-4">{feature.icon}</div>
              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 w-full">
      <Hero />

      <HowItWorks />

      <FAQ />
    </div>
  );
}
