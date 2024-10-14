import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Progress,
} from "@nextui-org/react";

import { UsageType } from "../dashboard";

import { Badge } from "@/components/badge";

type FreeTrialCardProps = {
  usage: UsageType;
  loading: boolean;
};

const DEFAULT_FREE_TRIAL_MAX_QUOTA = 50; // Sync with "FREE_TRIAL_MAX_QUOTA" env var from server

export default function FreeTrialCard({ usage, loading }: FreeTrialCardProps) {
  return (
    <Card className="overflow-auto bg-gray-100/10 text-card-foreground">
      <div className="grid gap-4">
        <CardHeader className="flex-row justify-between pb-4">
          <h1 className="text-xl font-semibold">Subscription & Usage</h1>
          <Badge
            className="border-primary-800 bg-primary-800/10 px-2 py-1 text-xs text-primary-800"
            variant="secondary"
          >
            Free Trial
          </Badge>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">FlyFast Credits</p>
              <p className="text-sm text-muted-foreground">
                <strong>
                  {loading ? (
                    "-"
                  ) : (
                    <strong>
                      {usage?.percent_credit_used != null
                        ? `${Math.min(usage.percent_credit_used, 100)}%`
                        : "Cannot find used percentage. Please contact FlyFast support."}
                    </strong>
                  )}
                </strong>
              </p>
            </div>
            <Progress
              className="mb-2 mt-2 h-2 w-full"
              color={"primary"}
              value={usage.percent_credit_used ?? undefined}
            />
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? "-" : Math.min(usage?.percent_credit_used ?? 0, 100)}
                % of free trial FlyFast Credits used
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Current Plan</p>
              <p className="text-sm text-muted-foreground">Free Trial</p>
            </div>
          </div>
          <div className="mt-8 flex justify-between space-x-4">
            <Button as={Link} href={"/pricing"}>
              Subscribe Now
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
