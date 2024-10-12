import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { UsageType } from "../dashboard";

import { Subscription } from "@/types/subscription";
import { capitalizeInital } from "@/lib/utils";
import { useCancelSubscription } from "@/hooks/useCancelSubscription";
import { useUpgradeSubscription } from "@/hooks/useUpgradeSubscription";
import {Badge} from "@/components/badge";

type SubscriptionCardProps = {
  subscription: Subscription | null;
  usage?: UsageType;
  user: User;
  loading: boolean;
};

export default function SubscriptionCard({
  subscription,
  usage,
  user,
  loading,
}: SubscriptionCardProps) {
  const upgradeSubscription = useDisclosure();
  const cancelSubscription = useDisclosure();
  const { handleCancelSubscription, isCanceling, isCanceled } =
    useCancelSubscription(user, subscription);
  const { handleUpgradeSubscription, isUpgrading } = useUpgradeSubscription(
    user,
    subscription,
  );

  const handleCancelClick = () => {
    if (isCanceled) {
      window.location.href = "/pricing";
    } else {
      cancelSubscription.onOpen();
    }
  };

  const handleUpgradeSubscriptionClick = async (onClose: () => void) => {
    try {
      if (subscription?.subscription_id) {
        await handleUpgradeSubscription();

        return;
      }
      toast.error("Failed to upgrade subscription. Subscription ID not found.");
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      toast.error("Failed to upgrade subscription.");
    } finally {
      onClose();
    }
  };

  const handleCancelSubscriptionClick = async (onClose: () => void) => {
    try {
      await handleCancelSubscription(subscription!.subscription_id);
    } finally {
      onClose();
    }
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
            <Button as={Link} href={"/pricing"} className="ml-auto text-primary-800" variant="bordered">
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
              Pro - {capitalizeInital(subscription.pricing_tier)}
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
                    : `${Math.min(usage?.percent_credit_used ?? 0, 100)}% of FlyFast Credits used`}
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
                  {capitalizeInital(subscription.pricing_tier)}
                </p>
                {subscription.pricing_tier == "monthly" && (
                  <>
                    <Button
                      size="sm"
                      variant="bordered"
                      onClick={upgradeSubscription.onOpen}
                    >
                      Upgrade
                    </Button>
                    <Modal
                      isOpen={upgradeSubscription.isOpen}
                      onOpenChange={upgradeSubscription.onOpenChange}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Upgrade
                            </ModalHeader>
                            <ModalBody>
                              Are you sure you want to upgrade your subscription
                              to the Yearly Tier?
                              <br />
                              <br />
                              <b>
                                This change will take effect immediately, and be
                                charged on your current payment method. The
                                price is reflected on the{" "}
                                <a
                                  className="cursor-pointer text-primary-700 transition-colors hover:text-primary-800"
                                  href="/pricing"
                                  target="_blank"
                                >
                                  pricing page
                                </a>
                                .
                              </b>
                              <br />
                              <br />
                              We&apos;ll refund the remaining funds from the
                              current monthly subscription depending on the days
                              remaining on your cycle. You will not be able to
                              downgrade afterwards.
                            </ModalBody>
                            <ModalFooter>
                              <Button variant="bordered" onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                disabled={isUpgrading}
                                onClick={() => {
                                  handleUpgradeSubscriptionClick(onClose);
                                }}
                              >
                                {isUpgrading
                                  ? "Upgrading..."
                                  : "Confirm Upgrade"}
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Current Period</p>
              <p className="text-sm text-muted-foreground">
                {new Date(
                  subscription.current_period_start * 1000,
                ).toLocaleDateString()}{" "}
                -{" "}
                {subscription.current_period_end
                  ? new Date(
                      subscription.current_period_end * 1000,
                    ).toLocaleDateString()
                  : "Now"}
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <Button
              className="px-0"
              disabled={isCanceling}
              onClick={handleCancelClick}
            >
              {isCanceling
                ? "Canceling..."
                : isCanceled
                  ? "Subscription canceled, reactivate?"
                  : "Cancel Subscription"}
            </Button>
            <Modal
              isOpen={cancelSubscription.isOpen}
              onOpenChange={cancelSubscription.onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Cancel Subscription
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Are you sure you want to cancel your subscription?
                        You&apos;ll lose access to premium features at the end
                        of your current billing period.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="mt-2"
                        variant="bordered"
                        onClick={onClose}
                      >
                        Keep Subscription
                      </Button>
                      <Button
                        className="mt-2"
                        disabled={isCanceling}
                        variant="ghost"
                        onClick={() => handleCancelSubscriptionClick(onClose)}
                      >
                        {isCanceling ? "Canceling..." : "Confirm Cancellation"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
