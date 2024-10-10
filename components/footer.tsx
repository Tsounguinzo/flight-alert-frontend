"use client";

export default function Footer() {
  return (
    <footer className="bg-foreground py-8 text-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:flex-row gap-2">
          {/* Company Information */}
          <div className="w-full">
            <div>
              <h2 className="font-bold text-3xl mb-3">Tripper</h2>
              <p className="mb-3">117 Abbey Rd, London NW8 9AY, UK</p>
              <p className="mb-3">+44 000 000 0000</p>
              <p className="mb-3">info@tripper.com</p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full flex justify-center">
            <div>
              <h2 className="font-bold text-lg mb-4">Company</h2>
              <ul className="space-y-2">
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Contacts
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Support
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full flex justify-center">
            <div>
              <h2 className="font-bold text-lg mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Flights
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotels
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Services
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

        <div className="flex justify-between mt-8">
          <div className="">
            <a className="mr-2 text-sm" href="#">
              Terms of use
            </a>
            <span> | </span>
            <a className="ml-2 text-sm" href="#">
              Privacy policy
            </a>
          </div>

          <div className="text-center">
            © Copyright {new Date().getFullYear()} Tripper
          </div>

          <div />
        </div>
      </div>
    </footer>
  );
}
