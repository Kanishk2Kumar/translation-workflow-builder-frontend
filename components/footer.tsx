import React from "react";

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-background-dark border-t border-border-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none h-full"></div>
      <h2 className="sr-only" id="footer-heading">
        Footer
      </h2>
      <div className="mx-auto max-w-300 px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="size-8 text-primary">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <span className="text-md font-bold text-text-main font-display">
                Translatio
              </span>
            </div>
            <p className="text-sm leading-6 text-text-secondary">
              Empowering healthcare providers with intelligent voice automation.
              Secure, scalable, and patient-centric.
            </p>
            <div className="flex space-x-6">
              <a
                className="text-gray-500 hover:text-primary transition-colors"
                href="#"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                className="text-gray-500 hover:text-primary transition-colors"
                href="#"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-text-main">
                  Solutions
                </h3>
                <ul className="mt-6 space-y-4" role="list">
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Appointment Booking
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Patient Triage
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Prescription Refill
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Post-Discharge
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-text-main">
                  Support
                </h3>
                <ul className="mt-6 space-y-4" role="list">
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      System Status
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Contact Sales
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-text-main">
                  Company
                </h3>
                <ul className="mt-6 space-y-4" role="list">
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-text-main">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4" role="list">
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm leading-6 text-text-secondary hover:text-primary"
                      href="#"
                    >
                      BAA Agreement
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border-dark py-8 sm:mt-20 lg:mt-24 relative z-10">
          <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-4 px-6 lg:flex-row lg:px-8">
            <p className="text-xs leading-5 text-gray-500">
              © 2026 Translatio Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-xs text-gray-500">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
