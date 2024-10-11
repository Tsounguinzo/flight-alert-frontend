import { ButtonProps } from "@nextui-org/react";

export enum FrequencyEnum {
  Monthly = "mothly",
  Daily = "daily",
}

export enum TiersEnum {
  Free = "free",
  Pro = "pro",
  Team = "team",
}

export type Frequency = {
  key: FrequencyEnum;
  label: string;
  priceSuffix: string;
};

export type Tier = {
  key: TiersEnum;
  title: string;
  price:
    | {
        [FrequencyEnum.Monthly]: string;
        [FrequencyEnum.Daily]: string;
      }
    | string;
  priceSuffix?: string;
  href: string;
  description?: string;
  mostPopular?: boolean;
  featured?: boolean;
  features?: string[];
  buttonText: string;
  buttonColor?: ButtonProps["color"];
  buttonVariant: ButtonProps["variant"];
};
