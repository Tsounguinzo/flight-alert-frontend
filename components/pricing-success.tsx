"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { CONTACT_EMAIL } from "@/utils/constants";

export default function PricingSuccess() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard?checkout=success");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="md:pb-15 mx-auto max-w-3xl pb-10 text-center text-2xl md:text-3xl lg:text-4xl">
        <h1 className="h1 leading-tight">
          Thank you for subscribing to FlyFast!
        </h1>
      </div>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center">
          <div
            aria-hidden="true"
            className="mr-3 grow border-t border-dotted border-gray-700"
          />
          <div className="text-center text-gray-700">
            We hope you enjoy using FlyFast. Feel free to send any suggestions
            our way at{" "}
            <Link
              className="font-medium text-gray-900 underline"
              href={`mailto:{CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </Link>
            .
          </div>
          <div
            aria-hidden="true"
            className="ml-3 grow border-t border-dotted border-gray-700"
          />
        </div>
        <div className="-mx-3 mt-11 flex flex-wrap">
          <div className="w-full px-3 text-center">
            <Button
              className="w-full"
              color={"primary"}
              size={"lg"}
              onClick={handleClick}
            >
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
