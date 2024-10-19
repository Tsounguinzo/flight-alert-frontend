"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { User } from "@supabase/supabase-js";

import { HeaderLogoV2 } from "../icons";

import { siteConfig } from "@/utils/constants";
import AuthButton from "@/components/nav/authbutton";

export const Navbar = ({ user }: { user: User | null }) => {
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      style={{ background: "rgba(52, 48, 79, 1)", color: "#fff" }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit items-center">
          <HeaderLogoV2 />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-extrabold text-3xl mt-2">FlyFast</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        as="div"
        className="hidden sm:flex sm:basis-full items-center justify-end"
      >
        <ul className="hidden lg:flex gap-12 w-full">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={`${item.href}-${item.label}`}>
              <Link
                className="text-white hover:bg-foreground/50 rounded-3xl"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent
        as="div"
        className="hidden sm:flex basis-1/5 sm:basis-full items-center justify-end"
      >
        <ul className="lg:flex gap-4 justify-end ml-2 w-full">
          <AuthButton user={user} />
        </ul>
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
