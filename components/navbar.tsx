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
  Input,
} from "@nextui-org/react";
import NextLink from "next/link";

import { HeaderLogo, SearchIcon } from "./icons";

import { siteConfig } from "@/utils/constants";

export const Navbar = async () => {

  return (
      <NextUINavbar
          maxWidth="xl"
          position="sticky"
          style={{backgroundColor: "#214CE7", color: "#fff"}}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit items-center">
            <HeaderLogo/>
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <p className="font-extrabold text-2xl">FlyFast</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
            as="div"
            className="hidden sm:flex basis-1/5 sm:basis-full items-center"
            justify="end"
        >
          <ul className="hidden lg:flex gap-4 justify-start ml-2 w-full">
            {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link href={item.href}>
                    <Button
                        as={Link}
                        radius="full"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                        }}
                        type="button"
                    >
                      {item.label}
                    </Button>
                  </Link>
                </NavbarItem>
            ))}
          </ul>
          <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                    "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
              }}
              endContent={<SearchIcon size={18}/>}
              placeholder="Free Search"
              radius="full"
              size="sm"
              type="search"
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <NavbarMenuToggle/>
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
