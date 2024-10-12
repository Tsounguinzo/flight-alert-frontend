"use client";

import {
  ArrowRightIcon,
  FacebookIcon,
  FooterLogo,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "./icons";

export default function Footer() {
  return (
    <footer
      className="py-8 text-default"
      style={{ background: "rgba(33, 76, 231, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-between md:flex-row gap-2">
          {/* Company Information */}
          <div className="w-full">
            <div>
              <div className="flex items-center mb-10 gap-4">
                <FooterLogo />
                <h2 className="font-bold text-3xl">FlyFast</h2>
              </div>
              <p className="mb-10">
                Worem ipsum dolor sit amet, cons ectetur adipiscing elit. Vestib
                ulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                Donec sollicitudin molestie malesuada.
              </p>
              <div className="flex items-center gap-4">
                <YoutubeIcon />
                <FacebookIcon />
                <InstagramIcon />
                <LinkedInIcon />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full flex justify-center hidden sm:block">
            <div>
              <h2 className="font-bold text-lg mb-4">Useful Links</h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    About Us
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Airlines
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Stops
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Connections
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Duration
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Links */}
          <div className="w-full flex justify-center hidden sm:block">
            <div>
              <h2 className="font-bold text-lg mb-4">Content</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Home
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    FAQ
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    Join Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full flex justify-center hidden sm:block">
            <div>
              <h2 className="font-bold text-lg mb-4">Contact Us</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    contactus@flyfast.io
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <ArrowRightIcon />
                  <a className="text-gray-300 hover:text-white" href="/">
                    +1-514-592-2445
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/*  Newsletter
                    <div className="col-span-1">
                        <h2 className="font-bold text-lg mb-4">Newsletter</h2>
                        <div className="flex items-center bg-foreground border border-default rounded-lg p-1">
                            <Input size={"md"} radius={"none"} type="email" classNames={{inputWrapper: "bg-foreground focus:bg-foreground border-r border-default text-default p-0", input: "text-lg", innerWrapper: "hover:bg-default focus:bg-default"}} label="Email" />
                            <button className="text-yellow-500 ml-2 p-3">
                                →
                            </button>
                        </div>
                        <p className="mt-4 text-primary text-sm">Subscribe to get news & offers</p>
                        <hr className="border border-default"/>
                            <div className="flex space-x-4 text-sm mt-2">
                                <p>We promise not to spam you</p>
                                <div className="flex mt-1 space-x-4">
                                <a href="https://instragram.com" className="text-gray-400 hover:text-white">
                                    <FaInstagram />
                                </a>
                                <a href="https://instragram.com" className="text-gray-400 hover:text-white">
                                    <FaPinterest />
                                </a>
                                <a href="https://instragram.com" className="text-gray-400 hover:text-white">
                                    <FaXTwitter />
                                </a>
                                </div>
                            </div>

                    </div>
                    */}
        </div>

        {/* <div className="flex justify-between mt-8">
          <div className="">
            <a className="mr-2 text-sm" href="/">
              Terms of use
            </a>
            <span> | </span>
            <a className="ml-2 text-sm" href="/">
              Privacy policy
            </a>
          </div>

          <div className="text-center">
            © Copyright {new Date().getFullYear()} Tripper
          </div>

          <div />
        </div> */}
      </div>
    </footer>
  );
}
