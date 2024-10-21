"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  cn,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";

import { Tables } from "@/types_db";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/client";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function Pricing({ user, products, subscription }: Props) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);

      return router.push(
        getErrorRedirect(
          "/signin",
          "Sign in to subscribe",
          "Please log in to subscribe to this plan.",
        ),
      );
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath,
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);

      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);

      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator.",
        ),
      );
    }

    const stripe = await getStripe();

    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center" />
        <p className="text-4xl font-extrabold sm:text-center sm:text-6xl">
          No subscription pricing plans found. Create them in your{" "}
          <a
            className="text-pink-500 underline"
            href="https://dashboard.stripe.com/products"
            rel="noopener noreferrer"
            target="_blank"
          >
            Stripe Dashboard
          </a>
          .
        </p>
      </section>
    );
  } else {
    return (
      <section className="relative flex max-w-full flex-col items-center justify-center">
        <div
          aria-hidden="true"
          className="px:5 absolute inset-x-0 top-3 z-0 h-full w-full transform-gpu overflow-hidden blur-3xl md:right-20 md:h-auto md:w-auto md:px-36"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-primary-100 opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex max-w-xl flex-col text-center">
          <h2 className="font-medium leading-7 text-primary">Pricing</h2>
          <h1 className="text-4xl font-medium tracking-tight">
            Get unlimited access.
          </h1>
          <Spacer y={4} />
          <h2 className="text-large text-default-500">
            Discover the ideal plan, beginning at under $2 per week.
          </h2>
        </div>
        <Spacer y={8} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((product) => {
            const price = product?.prices[0];

            /*const price = product?.prices?.find(
                            (price) => price.interval === billingInterval
                        );*/

            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            return (
              <Card
                key={product.name}
                isBlurred
                className={cn("bg-background/60 p-3 dark:bg-default-100/50", {
                  "border border-primary": subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === "FlyFast Pro Monthly",
                })}
                shadow="md"
              >
                {product.name === "FlyFast Pro Monthly" ? (
                  <Chip
                    className="absolute right-4 top-4"
                    color="primary"
                    variant="flat"
                  >
                    Most Popular
                  </Chip>
                ) : null}
                <CardHeader className="flex flex-col items-start gap-2 pb-6">
                  <h2 className="text-large font-medium">{product.name}</h2>
                  <p className="text-medium text-default-500">
                    {product.description}
                  </p>
                </CardHeader>
                <Divider />
                <CardBody className="gap-8">
                  <p className="flex items-baseline gap-1">
                    <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent p-2">
                      {priceString}
                    </span>
                    <span className="text-small font-medium text-default-400">
                      /{product?.prices[0].interval}
                    </span>
                  </p>
                  {/*<ul className="flex flex-col gap-2">
                    {product.features?.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Icon className="text-primary" icon="ci:check" width={24} />
                        <p className="text-default-500">{feature}</p>
                      </li>
                  ))}
                </ul>*/}
                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    aria-busy={priceIdLoading === price.id}
                    aria-label={`Subscribe to plan`}
                    color="primary"
                    onClick={() => handleStripeCheckout(price)}
                  >
                    {subscription
                      ? "Manage"
                      : priceIdLoading === price.id
                        ? "Processing..."
                        : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    );
  }
}
