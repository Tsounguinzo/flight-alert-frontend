"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { LuArrowBigRightDash } from "react-icons/lu";

import { siteConfig } from "@/utils/constants";
import { HeaderLogo, Logo } from "./icons";

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      style={{ backgroundColor: "#214CE7", color: "#fff" }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit items-center">
          <HeaderLogo />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-extrabold text-2xl">FlyFast</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify={"end"}
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2 w-full">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link href={item.href}>
                <Button
                  radius="full"
                  as={Link}
                  type="button"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            </NavbarItem>
          ))}
        </ul>
        {/* <NavbarItem className="hidden sm:flex gap-3">
          <Button
            as={Link}
            className="font-normal text-default-600 text-md"
            href="/payment"
            variant="light"
          >
            Subscribe
          </Button>
          <Button
            as={Link}
            className="font-normal text-default-600 text-md"
            href="/signin"
            variant="light"
          >
            Sign In
          </Button>
          <Button
            as={Link}
            className="font-normal text-default-600 group"
            color={"primary"}
            href="/signup"
            variant="ghost"
          >
            Get Started
            <LuArrowBigRightDash className="group-hover:scale-125" size={22} />
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
