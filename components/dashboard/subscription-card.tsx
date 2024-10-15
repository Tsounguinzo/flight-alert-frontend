import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { capitalizeInital } from "@/lib/utils";
import { Badge } from "@/components/badge";
import { Tables } from "@/types_db";
import { createStripePortal } from "@/utils/stripe/server";
import { UsageType } from "@/components/dashboard";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Product = Tables<"products">;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
  usage: UsageType;
  loading: boolean;
}

export default function SubscriptionCard({
  subscription,
  usage,
  loading,
}: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);

    setIsSubmitting(false);

    return router.push(redirectUrl);
  };

  if (!subscription) {
    return (
      <Card className="flex h-full flex-col overflow-auto bg-gray-100/10 text-card-foreground">
        <div className="grid gap-4">
          <CardHeader className="pb-4">
            <h1 className="text-xl font-semibold">Subscription</h1>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between text-muted-foreground">
              <p>You are currently not subscribed.</p>
            </div>
          </CardBody>
          <CardFooter className="mt-8 pt-6">
            <Button
              as={Link}
              className="ml-auto text-primary-800"
              href={"/pricing"}
              variant="bordered"
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-auto bg-gray-100/10 text-card-foreground">
      <div className="grid gap-4">
        <CardHeader className="flex-row justify-between pb-4">
          <h1 className="text-xl font-semibold">Subscription & Usage</h1>
          <div className="flex">
            <Badge
              className="border-primary-800 bg-primary-800/10 px-2 py-1 text-xs text-primary-800"
              variant="secondary"
            >
              Pro - {capitalizeInital(subscription?.prices?.products?.name)}
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          {usage && (
            <div className="mb-4">
              <div className="flex justify-between">
                <p className="font-medium">Requests</p>
                <p className="text-sm text-muted-foreground">
                  {loading ? (
                    "-"
                  ) : (
                    <strong>
                      {usage?.percent_credit_used != null
                        ? `${Math.min(usage.percent_credit_used, 100)}%`
                        : "Cannot find remaining percentage. Please contact FlyFast support."}
                    </strong>
                  )}
                </p>
              </div>
              <Progress
                className="mb-2 mt-2 h-2 w-full"
                color={"primary"}
                value={usage.percent_credit_used ?? undefined}
              />
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  {loading
                    ? "-"
                    : `${Math.min(usage?.percent_credit_used ?? 0, 100)}% of FastFly Credits used`}
                </p>
                <p className="text-right text-sm text-muted-foreground">
                  Credits refill monthly
                </p>
              </div>
            </div>
          )}
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Current Plan</p>
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground">
                  {capitalizeInital(subscription?.prices?.products?.name)}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Current Period</p>
              <p className="text-sm text-muted-foreground">
                {new Date(
                  subscription.current_period_start,
                ).toLocaleDateString()}{" "}
                -{" "}
                {subscription.current_period_end
                  ? new Date(
                      subscription.current_period_end,
                    ).toLocaleDateString()
                  : "Now"}
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <Button
              className="px-0"
              disabled={isSubmitting}
              onClick={handleStripePortalRequest}
            >
              Open customer portal
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
