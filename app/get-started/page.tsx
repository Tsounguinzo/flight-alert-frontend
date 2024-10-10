"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { domAnimation, LazyMotion, m } from "framer-motion";

import HorizontalSteps from "@/components/horizontal-steps";

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

const steps = [
  {
    title: "Create account",
  },
  {
    title: "Company Information",
  },
  {
    title: "Choose Address",
  },
  {
    title: "Complete Payment",
  },
  {
    title: "Preview and Confirm",
  },
];

export default function GetStarted() {
  const [[step, direction], setStep] = React.useState([0, 0]);

  const paginate = React.useCallback((newDirection: number) => {
    setStep((prev) => {
      const nextStep = prev[0] + newDirection;

      if (nextStep < 0 || nextStep > steps.length) return prev;

      return [nextStep, newDirection];
    });
  }, []);

  const onChangeStep = React.useCallback((newStep: number) => {
    setStep((prev) => {
      if (newStep < 0 || newStep > steps.length) return prev;
      const currentStep = prev[0];

      return [newStep, newStep > currentStep ? 1 : -1];
    });
  }, []);

  const onBack = React.useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const onNext = React.useCallback(() => {
    paginate(1);
  }, [paginate]);

  const content = React.useMemo(() => {
    let component = <>COMP 1</>;

    switch (step) {
      case 1:
        component = <>COMP 2</>;
        break;
      case 2:
        component = <>COMP 3</>;
        break;
      case 3:
        component = <>COMP 4</>;
        break;
      case 4:
        component = <>COMP 5</>;
        break;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={step}
          animate="center"
          className="col-span-12"
          custom={direction}
          exit="exit"
          initial="exit"
          transition={{
            y: {
              ease: "backOut",
              duration: 0.35,
            },
            opacity: { duration: 0.4 },
          }}
          variants={variants}
        >
          {component}
        </m.div>
      </LazyMotion>
    );
  }, [direction, step]);

  return (
    <section>
      <div className="flex justify-center">
        <HorizontalSteps
          currentStep={step}
          defaultStep={2}
          steps={steps}
          onStepChange={onChangeStep}
        />
      </div>
      <div className="flex h-full w-full flex-col items-center gap-4 md:p-4">
        <div className="h-full w-full p-4 sm:max-w-md md:max-w-lg">
          {content}
          <Button
            className="text-medium font-medium"
            type="submit"
            onPress={onNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
}
