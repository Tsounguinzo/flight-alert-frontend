"use client";

import {
  FacebookIcon,
  HeaderLogoV2,
  InstagramIcon,
  LinkedInIcon,
} from "./icons";

export default function Footer() {
  return (
    <footer
      className="w-full pb-5 text-default"
      style={{ background: "#0B0437" }}
    >
      <div className="w-full flex flex-col items-center justify-center gap-10 max-w-7xl mx-auto px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <HeaderLogoV2 />
        <ul className="w-full flex flex-col sm:flex-row items-center justify-center gap-10">
          <li>
            <a className="text-[14px] text-gray-300 hover:text-white" href="/">
              COOKIE POLICY
            </a>
          </li>
          <li>
            <a className="text-[14px] text-gray-300 hover:text-white" href="/">
              TERMS AND CONDITIONS
            </a>
          </li>
          <li>
            <a className="text-[14px] text-gray-300 hover:text-white" href="/">
              PRIVACY POLICY
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <FacebookIcon />
          <InstagramIcon />
          <LinkedInIcon />
        </div>
      </div>
      {/* Divider */}
      <div className="w-full border-b border-white my-4" />

      {/* Copyright Notice */}
      <div className="text-gray-300 text-center text-[14px]">
        © 2024 FlyFast. All rights reserved.
      </div>
    </footer>
  );
}
