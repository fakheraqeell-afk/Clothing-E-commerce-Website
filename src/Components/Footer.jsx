import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-gray-200 px-6 py-12 font-sans text-black md:min-h-[420px] md:px-0 md:py-0 bottom-0">

      <div className="mx-auto grid  w-full  grid-cols-1 gap-12 md:w-[74%] md:grid-cols-3 md:gap-0 md:pt-20 ">

        {/* LEFT */}
        <div className="flex flex-col gap-12 md:gap-[72px]">

          <div className="flex flex-col gap-6">
            <span className="text-[11px] tracking-wide text-[#a4a4a4]">
              INFO
            </span>

            <div className="flex flex-col">
              <a href="#pricing" className="text-sm leading-5 text-[#555] hover:text-black">
                PRICING
              </a>

              <div className="flex">
                <a href="#about" className="text-sm leading-5 text-[#555] hover:text-black">
                  ABOUT
                </a>
                <span className="ml-1 text-[#aaa]">/</span>
              </div>

              <a href="#contact" className="text-sm leading-5 text-[#555] hover:text-black">
                CONTACTS
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[11px] tracking-wide text-[#a4a4a4]">
              LANGUAGES
            </span>

            <div className="flex flex-col">
              <div className="flex">
                <a href="#eng" className="text-sm leading-5 text-[#555] hover:text-black">
                  ENG
                </a>
                <span className="ml-1 text-[#aaa]">/</span>
              </div>

              <a href="#esp" className="text-sm leading-5 text-[#555] hover:text-black">
                ESP
              </a>

              <a href="#sve" className="text-sm leading-5 text-[#555] hover:text-black">
                SVE
              </a>
            </div>
          </div>

        </div>

        {/* CENTER */}
        <div>
          <span className="mb-6 block text-[11px] tracking-wide text-[#a4a4a4] md:mb-9">
            TECHNOLOGIES
          </span>

          <div className="w-[170px] md:w-[190px]">

            <div className="flex h-16 items-center md:h-20">
              <span className="flex h-[50px] w-[38px] items-center justify-center text-4xl">
                <img src='src\images\img1.png' alt="" />
              </span>

              <span className="-ml-1 text-6xl font-extrabold leading-none text-[#eeeeee] md:text-[72px]">
                R
              </span>
            </div>

            <div className="-mt-1 flex flex-col">
              <span className="text-[55px] font-black leading-[0.9] tracking-[-4px] md:text-[68px]">
                XIV
              </span>

              <span className="text-[55px] font-black leading-[0.9] tracking-[-4px] md:text-[68px]">
                QR
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="pt-0 md:pt-[135px]">
          <div className="flex items-center gap-4 text-xs text-[#aaa] md:gap-5 md:text-sm">

            <span className="whitespace-nowrap">
              Near-field communication
            </span>

            <span className="h-12 w-[2px] rotate-[15deg] bg-[#ddd] md:h-[58px]" />

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-16 flex w-full items-center justify-between text-[11px] text-[#b6b6b6] md:absolute md:bottom-3 md:left-1/2 md:mt-0 md:w-[41%] md:-translate-x-1/2">

        <span>
          © 2024 — copyright
        </span>

        <a href="#privacy" className="text-[#aaa] hover:text-black">
          privacy
        </a>

      </div>

    </footer>
  );
};

export default Footer;